import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../db/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const Order = () => {
  const [consolidatedItems, setConsolidatedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.error("User not authenticated.");
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", currentUser.email)
        );

        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          console.error("User not found in Firestore.");
          return;
        }

        const userDocRef = userSnapshot.docs[0].ref;
        const orderCollections = [
          "orderDelivering",
          "orderShipped",
          "orderDelivered",
        ];
        let items = [];
        let total = 0;
        let qty = 0;

        for (const collectionName of orderCollections) {
          const orderSnapshot = await getDocs(
            collection(userDocRef, collectionName)
          );
          for (const doc of orderSnapshot.docs) {
            const data = doc.data();
            if (Array.isArray(data.orders)) {
              for (const order of data.orders) {
                const imageUrl =
                  order.imageUrl ||
                  (await getDownloadURL(ref(storage, order.imagePath)));

                const item = {
                  ...order,
                  id: doc.id, // Store the Firestore document ID for deletion
                  collection: collectionName, // Keep track of the collection
                  imageUrl,
                  status: data.status, // Access status field
                };

                items.push(item);
                total += order.price * (order.qty || 1);
                qty += order.qty || 1;
              }
            }
          }
        }

        setConsolidatedItems(items);
        setTotalPrice(total);
        setTotalQuantity(qty);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleRemoveItem = async (id, collection) => {
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    try {
      // Fetch user reference
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", currentUser.email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.error("User not found in Firestore.");
        return;
      }

      const userDocRef = userSnapshot.docs[0].ref;

      // Construct document reference
      const docRef = doc(db, `users/${userDocRef.id}/${collection}/${id}`);

      // Delete the document from Firestore
      await deleteDoc(docRef);

      // Update the UI
      setConsolidatedItems((prevItems) =>
        prevItems.filter(
          (item) => !(item.id === id && item.collection === collection)
        )
      );
      console.log(`Item with ID: ${id} successfully deleted.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

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
            <p>Orders</p>
            <p>You have {totalQuantity} items in your Orders</p>
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
                <th className="pb-3 text-center">Status</th>
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
                    }).format((item.price || 0) * (item.qty || 1))}
                  </td>
                  <td className="text-center">{item.status || "N/A"}</td>
                  <td className="text-center">
                    <MdDeleteForever
                      size={24}
                      onClick={() => handleRemoveItem(item.id, item.collection)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
