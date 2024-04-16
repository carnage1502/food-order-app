"use client";
import { useEffect, useState } from "react";
import EditImage from "../components/EditImage";
import React from "react";
import MenuItemPriceProps from "@/components/MenuItemPriceProps";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || undefined);
  const [categories, setCategories] = useState([]);
  const [extraIngredientsPrice, setExtraIngredientsPrice] = useState(
    menuItem?.extraIngredientsPrice || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((c) => {
        setCategories(c);
      });
    });
  }, []);
  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientsPrice,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra Ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientsPrice}
            setProps={setExtraIngredientsPrice}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
