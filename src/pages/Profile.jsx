import React, { useState, useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db, auth } from "../db/Firebase"; // Import Firebase db and auth
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Import necessary functions from Firestore
import { GiTakeMyMoney } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  // Fetch user data when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Check if the user document with matching email exists
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the document ID for the user with matching email
          const userDoc = querySnapshot.docs[0];
          const profileRef = doc(collection(userDoc.ref, "profile"), "details");

          try {
            const docSnapshot = await getDoc(profileRef);
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setFirstName(userData.firstName || "");
              setMiddleName(userData.middleName || "");
              setLastName(userData.lastName || "");
              setContactNumber(userData.contactNumber || "");
              setAddress(userData.address || "");
            }
          } catch (error) {
            console.error("Error fetching user profile data:", error);
          }
        }
      } else {
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const profileRef = doc(collection(userDoc.ref, "profile"), "details");

          await setDoc(
            profileRef,
            {
              firstName,
              middleName,
              lastName,
              contactNumber,
              address,
            },
            { merge: true }
          );
          toast.success("Successfully");
        } else {
          console.log("No user document found with the specified email.");
          toast.error("Failed to find the user document.");
        }
      } catch (error) {
        console.error("Error updating profile data:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    } else {
      console.log("User not logged in");
      toast.error(
        "User is not logged in. Please log in to update your profile."
      );
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#a2292e]">
      <ToastContainer className="absolute top-0 left-[50%] translate-x-[-50%]" />
      <div className="bg-white w-[50%] p-5 text-black flex flex-col gap-3 rounded-lg">
        <div className="flex flex-row justify-between items-center">
          <span className="text-lg text-center font-bold">Profile Details</span>
          <Link to="/shop">
            <FaArrowAltCircleLeft size={34} className="text-red-500" />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-black"
        >
          <input
            type="text"
            placeholder="First name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="outline-none border-[#a2292e] border-b border-solid py-1 text-lg"
          />
          <input
            type="text"
            placeholder="Middle name..."
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="outline-none border-[#a2292e] border-b border-solid py-1 text-lg"
          />
          <input
            type="text"
            placeholder="Last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="outline-none border-[#a2292e] border-b border-solid py-1 text-lg"
          />
          <input
            type="text"
            placeholder="Contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="outline-none border-[#a2292e] border-b border-solid py-1 text-lg"
          />
          <input
            type="text"
            placeholder="Full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="outline-none border-[#a2292e] border-b border-solid py-1 text-lg"
          />
          <button
            type="submit"
            className="bg-[#c94238] rounded-md text-white text-lg w-full py-1"
          >
            Confirm
          </button>
        </form>
        <div className="text-lg flex flex-row justify-center gap-1">
          <span>Payment Method: Cash on Delivery</span>
          <GiTakeMyMoney size={20} className="text-red-500 self-center" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
