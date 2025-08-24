import { React, useState, useContext, useEffect } from "react";
import "../components/style/scroll.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../components/layout/ShopLayout";
import {
  IoIosSearch,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosMenu,
  IoIosClose,
} from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import Logo from "../assets/logo.png";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineMailOpen } from "react-icons/hi";
import { db, storage, auth } from "../db/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const ShoppingPage = () => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Profile",
    lastName: "",
  });
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(null);
  const [orderQty, setOrderQty] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate;
  const { cartCount, setCartCount, searchQuery, setSearchQuery } =
    useContext(CartContext);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  function handleMenu() {
    setMenu(!menu);
  }
  function handleAccount() {
    setProfile(!profile);
  }
  function handleSearch() {
    setSearch(!search);
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery in context
  };

  function disableScroll() {
    document.body.classList.add("remove-scrolling");
  }

  function enableScroll() {
    document.body.classList.remove("remove-scrolling");
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userEmail = user.email;

          try {
            // Query Firestore for the user document matching the authenticated email
            const userQuery = query(
              collection(db, "users"),
              where("email", "==", userEmail)
            );
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
              const userDocRef = userSnapshot.docs[0].ref;
              const profileDetailsRef = doc(userDocRef, "profile", "details");
              const profileDoc = await getDoc(profileDetailsRef);

              if (profileDoc.exists()) {
                const data = profileDoc.data();
                setProfileData({
                  firstName: data.firstName || "Profile",
                  lastName: data.lastName || "",
                });
              } else {
                setError("Profile details not found.");
              }
            } else {
              setError("No user found with the provided email.");
            }
          } catch (error) {
            setError("Error fetching profile data: " + error.message);
          } finally {
            setLoading(false);
          }
        } else {
          setError("No user is currently logged in.");
          setLoading(false);
        }
      });
    };

    fetchProfileData();
  }, []); // Trigger when currentUser changes

  useEffect(() => {
    const fetchCartCount = async () => {
      if (currentUser) {
        const userEmail = currentUser.email;

        try {
          // Step 1: Find the user document with a matching email
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", userEmail)
          );
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            const userDocRef = userDoc.ref;
            const cartRef = collection(userDocRef, "cart");

            // Step 2: Set up a real-time listener for the cart sub-collection
            onSnapshot(cartRef, (snapshot) => {
              let totalQuantity = 0;

              snapshot.forEach((doc) => {
                const itemData = doc.data();
                totalQuantity += itemData.quantity || 1; // Accumulate quantities or default to 1
              });

              setCartCount(totalQuantity); // Update the cart count with total quantity
            });
          } else {
            console.log("User document not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartCount();
  }, [currentUser, setCartCount]);

  const [orderCount, setOrderCount] = useState([]);

  // for orders
  useEffect(() => {
    const fetchOrderCount = async () => {
      if (currentUser) {
        const userEmail = currentUser.email;

        try {
          // Step 1: Find the user document with a matching email
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", userEmail)
          );
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            const userDocRef = userDoc.ref;

            // Initialize total quantity
            let totalQuantity = 0;

            // Step 2: Fetch orders -> userId -> items
            const ordersRef = collection(userDocRef, "orders");
            const ordersSnapshot = await getDocs(ordersRef);

            ordersSnapshot.forEach((orderDoc) => {
              const orderData = orderDoc.data();
              if (orderData.items && Array.isArray(orderData.items)) {
                orderData.items.forEach((item) => {
                  totalQuantity += item.qty || 1; // Accumulate item quantities
                });
              }
            });

            // Step 3: Fetch data from orderShipped, orderDelivering, orderDelivered
            const orderStatuses = [
              "orderShipped",
              "orderDelivering",
              "orderDelivered",
            ];
            for (const status of orderStatuses) {
              const statusRef = collection(userDocRef, status);
              const statusSnapshot = await getDocs(statusRef);

              statusSnapshot.forEach((statusDoc) => {
                const statusData = statusDoc.data();
                if (statusData.items && Array.isArray(statusData.items)) {
                  statusData.items.forEach((item) => {
                    totalQuantity += item.qty || 1; // Accumulate item quantities
                  });
                }
              });
            }

            // Step 4: Update the cart count with the total quantity
            setOrderCount(totalQuantity);
          } else {
            console.log("User document not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      }
    };

    fetchOrderCount();
  }, [currentUser, setOrderCount]);

  const checkProfileAndNavigate = async (targetRoute) => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    try {
      const userEmail = currentUser.email;
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", userEmail)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDocRef = userSnapshot.docs[0].ref;
        const profileDocRef = doc(userDocRef, "profile", "details");
        const profileDoc = await getDoc(profileDocRef);

        if (profileDoc.exists()) {
          // Navigate to the desired route if profile exists
          navigate(targetRoute);
        } else {
          // Redirect to profile setup if no profile
          navigate("/shop/profile");
        }
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.error("Error checking profile data:", error);
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      if (currentUser) {
        try {
          // Step 1: Locate user document based on email
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", currentUser.email)
          );
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const userDocRef = userSnapshot.docs[0].ref;

            // Step 2: Initialize total quantity
            let totalQty = 0;

            // Step 3: Fetch all order collections (orderShipped, orderDelivering, orderDelivered)
            const orderStatuses = [
              "orders", // Regular orders
              "orderShipped",
              "orderDelivering",
              "orderDelivered",
            ];

            for (const status of orderStatuses) {
              const statusRef = collection(userDocRef, status);
              const statusSnapshot = await getDocs(statusRef);

              statusSnapshot.forEach((statusDoc) => {
                const statusData = statusDoc.data();
                if (statusData.items && Array.isArray(statusData.items)) {
                  statusData.items.forEach((item) => {
                    totalQty += item.qty || 1; // Add the item quantity or default to 1
                  });
                }
              });
            }

            // Step 4: Update state with total quantity
            setOrderQty(totalQty);
          } else {
            console.warn("User document not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching order quantities:", error);
        }
      }
    };

    fetchOrderData();
  }, [currentUser]);

  return (
    <div>
      <div className="w-full fixed top-0 left-0">
        {/* shop navigation bar */}
        <div
          className={
            handleSearch
              ? "w-full h-[60px] bg-white px-10 py-2 flex flex-row justify-between sm:gap-2 md:gap-0 shadow-md"
              : "sm:flex sm:flex-row sm:justify-between"
          }
        >
          {/* logo container and Category */}
          <div className="flex flex-row row-span-3 items-center">
            {/* logo column */}
            <div
              className="cursor-pointer self-end relative"
              onClick={handleMenu}
            >
              {!menu ? (
                <IoIosMenu size={38} onClick={disableScroll} />
              ) : (
                <IoIosClose size={38} onClick={enableScroll} />
              )}
            </div>

            {/* categories container */}
            <div
              className={
                menu
                  ? "absolute top-[60px] left-0 w-full h-screen bg-white pt-5 pb-[80px] flex flex-col gap-3 overflow-y-scroll"
                  : "hidden"
              }
            >
              {/* categories */}
              <Link
                to="/shop"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">all</span>
                <IoIosArrowForward size={16} />
              </Link>

              <Link
                to="/shop/dog-food"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">
                  dog food
                </span>
                <IoIosArrowForward size={16} />
              </Link>

              <Link
                to="/shop/cat-food"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">
                  cat food
                </span>
                <IoIosArrowForward size={16} />
              </Link>

              <Link
                to="/shop/dog-toy"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">Dog Toy</span>
                <IoIosArrowForward size={16} />
              </Link>

              <Link
                to="/shop/cat-toy"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">Cat Toy</span>
                <IoIosArrowForward size={16} />
              </Link>

              <Link
                to="/shop/supplies"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">
                  Supplies
                </span>
                <IoIosArrowForward size={16} />
              </Link>

              <Link
                to="/shop/collar"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">Collar</span>
                <IoIosArrowForward size={16} />
              </Link>

              {/* <Link
                to="/shop/cat-accessories"
                className="flex flex-row row-span-2 justify-between items-center px-10 cursor-pointer hover:text-white hover:bg-[#c94238]"
                onClick={() => setMenu(false)} // Close the menu when a link is clicked
              >
                <span className="font-light text-base capitalize">
                  cat accessories
                </span>
                <IoIosArrowForward size={16} />
              </Link> */}

              {/* line */}
              <hr className="my-3" />

              {/* Need help container*/}
              <div className="px-10 grid gap-3">
                {/* content of need help */}
                <span className="uppercase font-medium">need help?</span>
                <div className="w-auto text-sm flex flex-row row-span-2 gap-3 items-center">
                  {/* hotline */}
                  <LuPhoneCall size={18} />
                  <span className="uppercase font-medium">
                    petsville hotline:{" "}
                    <span className="font-bold">123-456-7890</span>
                  </span>
                </div>
                <div className="w-auto text-sm flex flex-row row-span-2 gap-3 items-center">
                  {/* email address */}
                  <HiOutlineMailOpen size={18} />
                  <span className="font-medium">sainggarhogenn@gmail.com</span>
                </div>
              </div>

              {/* line */}
              <hr className="my-3" />

              <div className="px-10">
                <p className="font-medium uppercase text-base mb-3">
                  follow us
                </p>

                <div className="grid gap-2">
                  {/* social media */}
                  <div className="flex flex-row col-span-2 gap-2 items-center">
                    <FaFacebook size={18} />
                    <div className="text-sm">Facebook</div>
                  </div>
                  <div className="flex flex-row col-span-2 gap-2 items-center">
                    <AiFillTwitterCircle size={18} />
                    <div className="text-sm">Twitter</div>
                  </div>
                  <div className="flex flex-row col-span-2 gap-2 items-center">
                    <FaInstagram size={18} />
                    <div className="text-sm">Instagram</div>
                  </div>
                </div>
              </div>
            </div>

            {/* logo image */}
            <img
              src={Logo}
              alt="logo"
              className={
                !search
                  ? "w-[40px] h-[40px] select-none flex"
                  : "sm:w-0 sm:h-0 md:w-[40px] md:h-[40px]"
              }
            />

            <span
              className={
                !search
                  ? "uppercase font-semibold text-[#c94238] sm:text-[22px] md:text-3xl self-end select-none"
                  : "sm:hidden md:block md:uppercase md:font-semibold md:text-[#c94238] md:text-3xl"
              }
            >
              petsville
            </span>
          </div>

          {/* search-container */}
          <div className="sm:hidden md:flex w-[40%] sm:ml-10 flex flex-row row-span-2 items-center border-[1px] rounded-md border-gray-400">
            {/* search column */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-[90%] px-3 text-sm outline-none"
            />
            <div className="md:w-[10%] h-full flex justify-center items-center bg-[#073273] cursor-pointer">
              <IoIosSearch size={24} className="text-white" />
            </div>
          </div>

          {/* Search Handle */}
          <div
            className={
              search
                ? "w-[40%] scale-x-100 overflow-hidden sm:flex md:hidden sm:ml-10 flex flex-row row-span-2 items-center border-[1px] rounded-md border-gray-400"
                : "scale-0 md:hidden"
            }
          >
            {/* search column */}
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="w-[90%] px-3 text-sm outline-none"
            />
            <div
              onClick={handleSearch}
              className="w-[15%] h-full flex justify-center items-center bg-[#073273] cursor-pointer"
            >
              <IoIosSearch size={24} className="text-white" />
            </div>
          </div>

          <IoIosSearch
            onClick={handleSearch}
            size={34}
            className={
              !search
                ? "sm:block md:hidden text-white hover:text-red-600 cursor-pointer p-2 bg-[#073273] rounded-full self-center"
                : "hidden"
            }
          />

          {/* account container */}
          <div
            onClick={() => checkProfileAndNavigate("/shop/profile")}
            className="flex items-center sm:ml-0 md:ml-10 sm:gap-3 md:gap-2 md:grow cursor-pointer relative"
          >
            {/* account */}
            <div className="h-5 overflow-x-hidden overflow-y-hidden text-sm font-light sm:capitalize md:uppercase sm:block md:block">
              {profileData.firstName} {profileData.lastName}
            </div>
            <Link to="/shop/profile">
              <CgProfile
                size={24}
                className="text-[#1cb5ed] sm:hidden md:block"
              />
            </Link>
          </div>

          {/* Cart container */}
          <Link
            to={cartCount > 0 ? "shop/cart" : "#"}
            onClick={() => checkProfileAndNavigate("shop/cart")}
            className={`flex flex-row justify-center items-center md:grow md:gap-2 ${
              cartCount === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {/* cart column */}
            <div className="text-[#c94238] relative">
              <BsCart2 size={20} className="" />
              <span className="absolute top-[-16px] right-[-12px] text-[12px] rounded-full bg-[#c94238] font-semibold text-white text-center px-[6px] py-[1px] cursor-default select-none">
                {cartCount}
              </span>
            </div>
            <div className="text-base text-[#c94238] font-medium sm:hidden md:block">
              Cart
            </div>
          </Link>
          <Link
            to={orderQty > 0 ? "/shop/order" : "#"}
            className={`w-[25px] h-[25px] p-1 bg-[#a9322e] rounded-full text-sm font-bold text-white text-center self-center ${
              orderQty > 0
                ? "cursor-pointer hover:bg-[#861f1b]"
                : "cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (orderQty === 0) {
                e.preventDefault(); // Prevent navigation when cart is empty
                alert("Your cart is empty! Add items to proceed.");
              }
            }}
          >
            {orderQty}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
