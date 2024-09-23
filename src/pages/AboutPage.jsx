import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PetShopStory from "../assets/pet-story.png";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full md:h-[808px] sm:h-auto my-10 px-10 py-5 flex md:flex-row sm:flex-col row-span-2 gap-10">
        <div className="md:w-1/2 sm:w-full md:h-full sm:h-[404px]">
          <img src={PetShopStory} alt="" className="h-full w-full" />
        </div>

        <div className="md:w-1/2 sm:w-full h-full">
          <h1 className="font-light md:text-7xl sm:text-3xl mb-5 w-[300px]">
            OUR YUMMY STORY
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            iste ex minus rem beatae non repellat error voluptates eius numquam
            cupiditate incidunt pariatur neque quidem, iusto ad dolorem magnam
            fuga! Nostrum voluptates facilis est laborum, ducimus consectetur
            quos illo nihil? Odit velit deleniti minima exercitationem
            aspernatur dolore, aliquid quidem nisi corporis quia unde vero
            sapiente quaerat nam autem id ratione illo quas eaque corrupti.
            Laboriosam culpa ipsam dicta neque tenetur.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto a
            veniam similique eligendi atque deleniti dolorum distinctio vel?
            Error eum facere magni nisi impedit, ad ullam placeat totam!
            Quisquam pariatur odio nulla commodi dolorem incidunt asperiores,
            sed iste, ratione aliquid deserunt dolor eos at porro dolorum animi
            non? Eligendi corrupti ipsa est aspernatur autem amet quasi ea dolor
            consectetur enim.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
