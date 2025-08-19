import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { db, storage, auth } from "../db/Firebase";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { CartContext } from "../components/layout/ShopLayout";
import { onAuthStateChanged } from "firebase/auth";

const ShopMainPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const placeholderImage = "/path/to/placeholder/image.jpg";
  const { addToCart, searchQuery } = useContext(CartContext);
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    // Track authentication state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Fetch products from Firestore or localStorage
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setFilteredProducts(parsedProducts);
      setLoading(false);
    } else {
      const productCollection = collection(db, "pet-food-pet-accessories");
      const unsubscribe = onSnapshot(productCollection, async (snapshot) => {
        const productList = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageRef = ref(
              storage,
              `images/pet-food-pet-accessories/${data.imageName}`
            );
            try {
              const imageUrl = await getDownloadURL(imageRef);
              return { ...data, imageUrl };
            } catch (error) {
              return { ...data, imageUrl: placeholderImage };
            }
          })
        );
        setProducts(productList);
        setFilteredProducts(productList);
        localStorage.setItem("products", JSON.stringify(productList));
        setLoading(false);
      });

      return () => {
        unsubscribe();
        unsubscribeAuth();
      };
    }
  }, []);

  // Filter products based on search query
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart(product);

    if (auth.currentUser) {
      try {
        const usersRef = collection(db, "users");
        const userQuery = query(
          usersRef,
          where("email", "==", auth.currentUser.email)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocId = userDoc.id;

          const newProductId = `${
            product.id || product.barcode || product.name
          }-${Date.now()}`;
          const userCartRef = doc(db, "users", userDocId, "cart", newProductId);

          await setDoc(userCartRef, {
            ...product,
            quantity: 1,
            imageUrl: product.imageUrl,
          });

          // Update cartItems in the context after successfully adding to Firestore
          const updatedCart = [...cartItems, { ...product, id: newProductId }];
          setCartItems(updatedCart);

          console.log("Updated Cart State After Adding Product:", updatedCart);
        } else {
          console.error("No user document found for the authenticated email");
        }
      } catch (error) {
        console.error("Error managing cart in Firestore: ", error);
      }
    }
  };

  // Handle pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-10 mt-[90px]">
      <div className="font-semibold text-sm flex gap-1">
        <Link to="/">Home</Link>
        <IoIosArrowForward size={14} className="self-center" />
        <span>Shop</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-600">
            Loading products...
          </p>
        </div>
      ) : (
        <>
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

export default ShopMainPage;
