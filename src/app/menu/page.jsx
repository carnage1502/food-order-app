"use client";
import { useState } from "react";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/UserTabs";
import EditImage from "../../components/EditImage";
import toast from "react-hot-toast";
const MenuPage = () => {
  const { loading, data } = useProfile();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [image, setImage] = useState("");

  if (loading) return "Loading user info...";
  if (!data.admin) return "Not an admin...";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = { image, name, description, basePrice };
    let uploadingToast;
    try {
      uploadingToast = toast.loading("Saving...");
      await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      toast.dismiss(uploadingToast);
      toast.success("Saved!");
    } catch (err) {
      toast.dismiss(uploadingToast);
      toast.error("Error");
      console.error(err);
    }
  };
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
            <label>Base price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MenuPage;
