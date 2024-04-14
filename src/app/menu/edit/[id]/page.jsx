"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../../../components/UseProfile";
import toast from "react-hot-toast";
import UserTabs from "../../../../components/UserTabs";
import Link from "next/link";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/MenuItemForm";

const EditMenuItemPage = () => {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
    data = { ...data, _id: id };
    let uploadingToast;
    try {
      uploadingToast = toast.loading("Saving...");
      await fetch("/api/menu-items", {
        method: "PUT",
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

    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu");
  }

  if (loading) return "Loading user info...";
  if (!data.admin) return "Not an admin...";
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu"} className="button">
          <FaRegArrowAltCircleLeft className="mt-1" />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default EditMenuItemPage;
