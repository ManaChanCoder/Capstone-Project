import React, { createContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShoppingPage from "../../pages/ShoppingPage";
import Footer from "../Footer";
import { db, auth } from "../../db/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
const CartContext = createContext();
export { CartContext };

const ShopLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Function to add items to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name
            ? { ...item, qty: item.qty + 1, totalPrice: item.qty * item.price }
            : item
        );
      } else {
        return [
          ...prevItems,
          { ...product, qty: 1, totalPrice: product.price },
        ];
      }
    });
    setCartCount((prevCount) => prevCount + 1);
  };

  // Function to remove an item from the cart
  const removeItem = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== productName)
    );
    setCartCount((prevCount) => prevCount - 1);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  // Retrieve cart data from Firestore when the user logs in
  useEffect(() => {
    const fetchCartData = async (userId) => {
      try {
        const q = query(
          collection(db, "transactions"),
          where("userId", "==", userId),
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const latestTransaction = querySnapshot.docs[0].data();
          setCartItems(latestTransaction.cartItems || []);
          setCartCount(latestTransaction.cartItems?.length || 0);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    // Listen for auth state changes to ensure user is logged in before fetching data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCartData(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  // Save cart data to Firestore whenever cartItems or cartCount changes
  useEffect(() => {
    const saveCartData = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const transactionRef = collection(db, "transactions");
          const transactionData = {
            userId,
            cartItems,
            timestamp: new Date(),
          };

          await addDoc(transactionRef, transactionData);
        } catch (error) {
          console.error("Error saving cart data:", error);
        }
      }
    };
    saveCartData();
  }, [cartItems]);

  const isCartPage = location.pathname === "/shop/cart";
  const isProfilePage = location.pathname === "/shop/profile";
  const isOrderPage = location.pathname === "/shop/order";

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // Ensure setCartItems is included in the context
        addToCart,
        cartCount,
        setCartCount,
        clearCart,
        removeItem,
        searchQuery,
        setSearchQuery,
      }}
    >
      <div>
        {isProfilePage ? (
          <Outlet />
        ) : isOrderPage ? (
          <Outlet />
        ) : (
          <>
            {!isCartPage && <ShoppingPage />}
            <Outlet />
            {!isCartPage && <Footer />}
          </>
        )}
      </div>
    </CartContext.Provider>
  );
};

export default ShopLayout;
