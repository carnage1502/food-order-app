import React from "react";

const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-3 text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <button className="mt-4 bg-primary text-white rounded-full py-2 px-8">
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItem;
