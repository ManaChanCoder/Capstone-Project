import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate message before submitting
    const isValidMessage = validateMessage();
    if (!isValidMessage) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/send-email", // Backend endpoint
        formData
      );
      alert(response.data.message || "Email sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  const validateMessage = () => {
    const message = formData.message.trim();
    const wordCount = message.split(/\s+/).length;

    if (wordCount < 35) {
      alert("Message must contain at least 35 words.");
      return false; // Validation failed
    }

    return true; // Validation passed
  };

  return (
    <div>
      <div className="my-10 px-10 w-full">
        <h1 className="md:text-5xl sm:text-3xl font-bold uppercase md:py-14 sm:pt-14 sm:pb-5 text-center">
          contact us
        </h1>

        <div className="flex flex-row justify-center row-span-3 gap-5">
          <div className="">
            <span className="font-light md:text-base sm:text-sm">
              sainggarhogenn@gmail.com
            </span>
          </div>
          <div className="">
            <span className="font-light md:text-base sm:text-sm">|</span>
          </div>
          <div className="">
            <span className="font-light md:text-base sm:text-sm">
              123-456-7890
            </span>
          </div>
        </div>

        <p className="mt-2 text-center font-light md:text-base sm:text-sm">
          500 Terry Francine Street San Francisco, CA 94158
        </p>

        <div className="xl:w-1/2 md:w-full sm:w-full my-10 px-5 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col col-span-3 gap-3"
          >
            <div>
              <label className="font-light text-base">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
              />
            </div>
            <div>
              <label className="font-light text-base">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
              />
            </div>
            <div>
              <label className="font-light text-base">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
              />
            </div>
            <div>
              <label className="font-light text-base">Phone *</label>
              <input
                type="text" // Change to text to allow leading zeros
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="^09\d{9}$" // Regex to ensure the number starts with 09 and has 11 digits
                title="Phone number must start with 09 and be 11 digits long"
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
              />
            </div>
            <div>
              <label className="font-light text-base">
                Leave your message here... *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border-[1px] border-black outline-none h-[120px]"
                onBlur={validateMessage} // Custom validation for word count
              ></textarea>
            </div>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="text-white bg-[#c94238] hover:bg-[#05307a] px-14 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <h3 className="text-center font-semibold text-3xl mt-[60px] mb-10">
          Distributor
        </h3>

        <div className="flex md:flex-row sm:flex-col xl:row-span-3 md:row-span-2 sm:col-span-1 flex-wrap xl:gap-5 md:gap-0 justify-center">
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5  uppercase">
              San Francisco
            </h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">
              Los Angeles
            </h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">Washington</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5  uppercase">New York</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">Las Vegas</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">Miami</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
