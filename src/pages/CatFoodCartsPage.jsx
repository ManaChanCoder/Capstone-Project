import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { db, storage, auth } from "../db/Firebase";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { CartContext } from "../components/layout/ShopLayout";
import { onAuthStateChanged } from "firebase/auth";

const CatFoodCartsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const placeholderImage = "/path/to/placeholder/image.jpg";
  const { addToCart, searchQuery, cartItems } = useContext(CartContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if logged in, false otherwise
    });
    const productCollection = collection(db, "pet-food-pet-accessories");
    const unsubscribe = onSnapshot(productCollection, async (snapshot) => {
      const productList = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();

          // Filter products by category "Dog Food"
          if (data.category !== "Cat Food") return null;

          const imageRef = ref(
            storage,
            `images/pet-food-pet-accessories/${data.imageName}`
          );
          try {
            const imageUrl = await getDownloadURL(imageRef);
            return { ...data, imageUrl, id: doc.id };
          } catch (error) {
            return { ...data, imageUrl: placeholderImage, id: doc.id };
          }
        })
      );

      // Filter out any null values returned from the map function
      setProducts(productList.filter((product) => product !== null));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    // Add to cart in context
    addToCart(product);

    if (auth.currentUser) {
      try {
        // Find the user's document based on email
        const usersRef = collection(db, "users");
        const userQuery = query(
          usersRef,
          where("email", "==", auth.currentUser.email)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          // Assuming there's only one document per email
          const userDoc = querySnapshot.docs[0];
          const userDocId = userDoc.id;

          // Generate a new product ID each time (using timestamp or random value)
          const newProductId = `${
            product.id || product.barcode || product.name
          }-${Date.now()}`;

          // Reference to the user's cart sub-collection within their document
          const userCartRef = doc(db, "users", userDocId, "cart", newProductId);

          // Add the product to the cart if it's not already there
          await setDoc(userCartRef, {
            ...product,
            quantity: 1, // Each product is added with a quantity of 1
            imageUrl: product.imageUrl, // Include the image URL
          });

          console.log("New product added to Firestore cart with unique ID");
        } else {
          console.error("No user document found for the authenticated email");
        }
      } catch (error) {
        console.error("Error managing cart in Firestore: ", error);
      }
    }
  };

  return (
    <div className="px-10 mt-[90px]">
      {/* Breadcrumb Navigation */}
      <div className="font-semibold text-sm flex gap-1">
        <Link to="/shop">Home</Link>
        <IoIosArrowForward size={14} className="self-center" />
        <span>Cat Food</span>
      </div>

      {/* Loading Message */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-600">
            Loading products...
          </p>
        </div>
      ) : (
        <>
          {/* Product Display */}
          <div className="flex flex-row flex-wrap gap-5">
            {currentProducts.map((product, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 grow items-center h-[460px] px-3 py-2 shadow-md"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-[200px] h-[200px]"
                />
                <div className="w-[250px] h-auto flex flex-1 flex-col justify-between gap-2">
                  <span className="text-sm font-light uppercase">
                    petsville
                  </span>
                  <span className="font-medium">{product.name}</span>
                  <span className="font-semibold text-[#1cb5ed] text-lg">
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(product.price)}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm"
                >
                  add to cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-5 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === index + 1
                    ? "bg-[#1cb5ed] text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CatFoodCartsPage;
