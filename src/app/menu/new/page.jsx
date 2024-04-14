"use client";
import { useState } from "react";
import { useProfile } from "../../../components/UseProfile";
import toast from "react-hot-toast";
import UserTabs from "../../../components/UserTabs";
import Link from "next/link";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/MenuItemForm";

const NewMenuItemPage = () => {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default NewMenuItemPage;
