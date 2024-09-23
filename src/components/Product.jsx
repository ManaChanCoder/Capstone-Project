import React from "react";
import Food1 from "../assets/pet_food/pet-food-1.png";
import Food2 from "../assets/pet_food/pet-food-2.png";
import Food3 from "../assets/pet_food/pet-food-3.png";
import Food4 from "../assets/pet_food/pet-food-4.png";
import Food5 from "../assets/pet_food/food-5.png";
import Food6 from "../assets/pet_food/food-6.png";
import Food7 from "../assets/pet_food/food-7.png";
import Food8 from "../assets/pet_food/food-8.png";
import Toy1 from "../assets/accessories/toy-1.png";
import Toy2 from "../assets/accessories/toy-2.png";
import Toy3 from "../assets/accessories/toy-3.png";
import Toy4 from "../assets/accessories/toy-4.png";

const Product = () => {
  return (
    <div className="w-full mt-10 px10 py-5">
      <h1 className="text-4xl text-center mb-10">Our Products</h1>

      <span className="uppercase text-sml font-bold ml-10 text-[#1cb5ed]">
        dog food
      </span>
      <div className="flex flex-row md:flex-nowrap sm:flex-wrap justify-center row-span-4 md:gap-3 sm:gap-5 mt-2 px-10">
        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food1}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            pedigree adult beef and vegetables dry dog food 1.5kg
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 305.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food2}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            royal canin breed health nutrition adult pug dry food 1.5kg
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">
            P 1,150.00
          </p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food3}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            royal canin size health nutrition adult mini dry dog food 2kg
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">
            P 1,125.00
          </p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food4}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            goodboy little small breed adult lamb and beef dry dog food 2kg
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 379.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>
      </div>
      <button className="ml-[50%] translate-x-[-50%] mt-10 px-10 py-2 bg-[#1cb5ed] hover:bg-[#c94238] rounded-3xl text-white text-base uppercase">
        view all
      </button>

      <span className="uppercase text-sml font-bold ml-10 text-[#1cb5ed] block mt-5">
        cat food
      </span>
      <div className="flex flex-row md:flex-nowrap sm:flex-wrap justify-center row-span-4 md:gap-3 sm:gap-5 mt-2 px-10">
        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food5}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            SmartHeart Adult Tuna in Jelly Wet Cat Food 400g (2 cans)
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 178.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food6}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            Kit Cat Grain Free Tuna and Katsoubushi Wet Cat Food 400g (2 cans)
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 190.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food7}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            Royal Canin Feline Care Nutrition Adult Urinary Care Dry Cat Food
            2kg
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">
            P 1,490.00
          </p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Food8}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            Acana Adult Indoor Entrée Dry Cat Food 1.8kg
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">
            P 1,225.00
          </p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>
      </div>
      <button className="ml-[50%] translate-x-[-50%] mt-10 px-10 py-2 bg-[#1cb5ed] hover:bg-[#c94238] rounded-3xl text-white text-base uppercase">
        view all
      </button>

      <span className="uppercase text-sml font-bold ml-10 text-[#1cb5ed] block mt-5">
        accessories
      </span>
      <div className="flex flex-row md:flex-nowrap sm:flex-wrap justify-center row-span-4 md:gap-3 sm:gap-5 mt-2 px-10">
        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Toy1}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            BETOP Cat Feather Teaser Stick with Suction Plate Interactive Toys
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 42.90</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Toy2}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            Cat toy mouse chasing toy Cat interactive toy in cage
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 25.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Toy3}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            Doggo Double Ball Dog Toy
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 189.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>

        <div className="md:w-[300px] sm:w-[400px] h-auto shadow-xl py-5 px-10">
          <img
            src={Toy4}
            alt=""
            className="w-[150px] h-[150px] ml-[50%] translate-x-[-50%]"
          />

          <h5 className="uppercase text-sm font-light my-5 text-[#c94238]">
            petsville
          </h5>
          <h4 className="capitalize text-base font-medium h-[80px]">
            Zee.Dog Honey Dog Leash
          </h4>
          <p className="text-lg font-semibold text-[#1cb5ed] mt-5">P 599.00</p>
          <button className="capitalize w-full text-center px-10 py-3 mt-5 bg-[#1cb5ed] hover:bg-[#c94238] text-white text-sm">
            add to cart
          </button>
        </div>
      </div>
      <button className="ml-[50%] translate-x-[-50%] mt-10 px-10 py-2 bg-[#1cb5ed] hover:bg-[#c94238] rounded-3xl text-white text-base uppercase">
        view all
      </button>
    </div>
  );
};

export default Product;
