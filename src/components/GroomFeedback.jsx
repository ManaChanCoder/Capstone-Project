import React from "react";
import Feedback from "../assets/groom-feedback.png";

const GroomFeedback = () => {
  return (
    <div className="w-full h-auto p-10 flex justify-center mt-10 text-white">
      <div className="md:relative md:left-[-200px]">
        <img src={Feedback} className="w-[560px] h-[600px]" alt="" />

        <div className="bg-[#8b6357] md:w-[460px] sm:w-auto h-auto] px-[80px] py-10 md:absolute md:top-[80px] md:right-[-350px]">
          <h1 className="font-bold md:text-2xl sm:text-3xl my-5">
            Hi, Im Wendy
          </h1>
          <p className="md:text-sm sm:text-base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            ratione non dicta labore quo id similique dolores neque consectetur
            corporis distinctio aliquam quidem reiciendis, sapiente ipsam eos
            asperiores iste. Soluta voluptas perspiciatis quo et ipsa atque
            tempora ut molestiae iusto harum nisi, praesentium facere itaque nam
            officiis quam incidunt velit assumenda doloremque beatae quia. Nihil
            numquam culpa tempora sit quos minus? Accusamus, dicta veniam.
            Doloremque ipsum quae exercitationem vel mollitia?
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroomFeedback;
