import React from "react";

const MenuItem = ({
  image,
  name,
  description,
  basePrice,
  size,
  extraIngredientsPrice,
}) => {
  return (
    <div className="bg-white border p-4 rounded-lg text-center hover:bg-gray-100 hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          alt="image"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-3 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <button className="mt-4 bg-primary text-white rounded-full py-2 px-8">
        Add to cart ${basePrice}
      </button>
    </div>
  );
};

export default MenuItem;
