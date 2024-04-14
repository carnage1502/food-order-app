"use client";
import { useState } from "react";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/UserTabs";

const MenuPage = () => {
  const { loading, data } = useProfile();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [file, setFile] = useState(null);

  if (loading) return "Loading user info...";
  if (!data.admin) return "Not an admin...";
  const handleFormSubmit = async (e) => {};
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div
          className="grid gap-4 items-start"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>image</div>
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
            <label>Base price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MenuPage;
