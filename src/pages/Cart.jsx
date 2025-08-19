import React, { useContext, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CartContext } from "../components/layout/ShopLayout";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../db/Firebase";
import {
  writeBatch,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const Cart = () => {
  const {
    cartItems = [],
    clearCart,
    removeItem,
    setCartItems,
    setCartCount,
  } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Consolidate items and compute total price per item
  const consolidatedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.qty += item.qty || 1;
      existingItem.totalPrice = existingItem.price * existingItem.qty;
    } else {
      acc.push({
        ...item,
        qty: item.qty || 1,
        totalPrice: item.price * (item.qty || 1),
      });
    }
    return acc;
  }, []);

  // Calculate total price and total quantity for the cart
  const totalPrice = consolidatedItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const totalQuantity = consolidatedItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  useEffect(() => {
    const fetchCartFromFirestore = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const usersCollection = collection(db, "users");
          const userQuery = query(
            usersCollection,
            where("email", "==", user.email)
          );
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const userDocId = userSnapshot.docs[0].id;
            const cartRef = collection(db, "users", userDocId, "cart");

            const cartSnapshot = await getDocs(cartRef);
            const cartData = cartSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            setCartItems(cartData);
            setCartCount(cartData.length);
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCartFromFirestore();
  }, [setCartItems, setCartCount]);

  const handleConfirm = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to confirm your order.");
      return;
    }

    try {
      // Query the user document based on email
      const usersCollection = collection(db, "users");
      const userQuery = query(
        usersCollection,
        where("email", "==", user.email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.error("No user found with the matching email");
        alert("User not found. Please check your account.");
        return;
      }

      const userDocId = userSnapshot.docs[0].id;

      // Check if profile details exist
      const profileRef = doc(db, "users", userDocId, "profile", "details");
      const profileSnapshot = await getDocs(
        collection(db, "users", userDocId, "profile")
      );

      if (profileSnapshot.empty) {
        console.log("Profile data not found. Redirecting to Profile setup...");
        navigate("/shop/profile");
        return;
      }

      // Proceed with order confirmation
      const ordersRef = collection(db, "users", userDocId, "orders");

      // Use addDoc to create a new document with a unique ID for each order
      await addDoc(ordersRef, {
        items: consolidatedItems,
        totalPrice,
        date: new Date().toISOString(),
      });
      console.log("Order confirmed and saved successfully!");

      // Delete all cart items from Firestore
      const cartRef = collection(db, "users", userDocId, "cart");
      const cartSnapshot = await getDocs(cartRef);

      const batch = writeBatch(db);

      cartSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch delete
      await batch.commit();
      console.log("Cart items deleted from Firestore");

      // Clear the cart in the context and UI
      clearCart();
      setCartCount(0);
      setCartItems([]);
      navigate("/shop");
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Error confirming your order, please try again.");
    }
  };

  const handleRemoveItem = async (productId) => {
    console.log("Trying to remove item with ID:", productId); // Log to check productId

    if (!productId) {
      console.error("Product ID is undefined");
      return; // Stop execution if productId is not defined
    }

    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated");
      alert("Please log in to remove items.");
      return;
    }

    try {
      // Query the users collection for a matching email
      const usersCollection = collection(db, "users");
      const userQuery = query(
        usersCollection,
        where("email", "==", user.email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.error("No user found with the matching email");
        alert("No user found.");
        return;
      }

      // Get the user document ID
      const userDocId = userSnapshot.docs[0].id;

      // Reference the product document in the user's cart
      const productRef = doc(db, "users", userDocId, "cart", productId);
      console.log("Product Reference:", productRef); // Log the reference

      // Delete the product from Firestore
      await deleteDoc(productRef);
      console.log(`Product with ID ${productId} removed from Firestore cart`);

      // Update the local cart context
      setCartItems((prevItems) => {
        if (!Array.isArray(prevItems)) {
          console.error("Previous items are not an array");
          return [];
        }

        // Log and verify cart items before removing
        console.log("Previous Cart Items:", prevItems);

        const updatedItems = prevItems.filter((item) => item.id !== productId);
        console.log("Updated Cart Items:", updatedItems); // Log updated items

        return updatedItems;
      });

      setCartCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error("Error removing product from Firestore cart:", error);
      alert("Error removing product, please try again.");
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="w-full h-screen bg-[#a2292e] relative">
      <div className="w-[70%] max-h-[500px] h-[500px] p-5 overflow-y-auto bg-white text-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md">
        <div className="flex flex-col gap-5">
          <Link
            to="/shop"
            className="flex flex-row items-center text-black hover:text-[#a2292e] active:font-bold cursor-pointer gap-3 text-lg"
          >
            <IoArrowBackOutline size={24} />
            <span>Continue Shopping</span>
          </Link>
          <hr />

          <div className="text-base">
            <p>Shopping Cart</p>
            <p>You have {totalQuantity} items in your cart</p>
          </div>
        </div>

        <div className="mt-5">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-3">Image</th>
                <th className="pb-3 text-center">Product</th>
                <th className="pb-3">Price</th>
                <th className="pb-3 text-center">Quantity</th>
                <th className="pb-3 text-center">Total</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {consolidatedItems.map((item, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-3">
                    <img
                      src={item.imageUrl || "/path/to/default-image.jpg"}
                      alt={item.name || "Product Image"}
                      className="w-[60px] h-[60px]"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(item.price || 0)}
                  </td>
                  <td className="text-center">{item.qty}</td>
                  <td>
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(item.totalPrice || 0)}
                  </td>
                  <td className="text-center">
                    <MdDeleteForever
                      size={24}
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[#a2292e] hover:scale-[1.1] ml-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col items-end gap-3 mt-3">
            <div className="text-lg font-semibold">
              Total Price:{" "}
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(totalPrice || 0)}
            </div>
            <button
              onClick={handleConfirm}
              className="bg-slate-800 active:bg-[#a2292e] text-white text-md rounded-lg px-2 py-1"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
