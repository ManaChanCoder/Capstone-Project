import React from "react";
import PetShopStory from "../assets/pet-story.png";

const AboutPage = () => {
  return (
    <div>
      <div className="w-full md:h-[808px] sm:h-auto my-10 px-10 py-5 flex md:flex-row sm:flex-col row-span-2 gap-10">
        <div className="md:w-1/2 sm:w-full md:h-full sm:h-[404px]">
          <img src={PetShopStory} alt="" className="h-full w-full" />
        </div>

        <div className="md:w-1/2 text-base sm:w-full h-full">
          <h1 className="font-light md:text-7xl sm:text-3xl mb-5 w-[300px]">
            OUR YUMMY STORY
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
            voluptatem, delectus at vero ullam quae ducimus enim recusandae
            accusamus libero vel dicta hic, magni pariatur dignissimos. Sed, ab
            vero? Quis totam optio consequatur a cupiditate maiores sunt animi
            inventore maxime iusto iste voluptatibus quisquam officiis fugiat,
            consequuntur aliquid nostrum ducimus? Perspiciatis magni ullam,
            dicta fuga quia repudiandae aperiam consequatur iusto sint corrupti
            voluptas harum, dolor architecto fugit. Alias magni repudiandae
            ipsam culpa, quis consequatur quaerat. At possimus quam explicabo
            velit tempore doloremque ipsa officiis placeat.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            porro nam aliquid nobis modi assumenda ducimus dolorum eveniet id,
            dignissimos laborum, non temporibus maiores! Nihil mollitia eos
            dolores sequi ut saepe, ratione a deserunt velit perspiciatis
            impedit et. Sequi placeat quasi sint voluptatibus aut! Aliquid
            aperiam perferendis vero sint veniam praesentium laudantium at rerum
            velit possimus, tenetur ipsa officia necessitatibus maxime id, in
            nisi mollitia culpa dolores. Voluptatibus distinctio, labore quos
            porro, eos vero rem numquam voluptatem aliquid, voluptatum deleniti
            ipsum! A facilis inventore tenetur officia. Numquam odit natus
            consectetur?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
