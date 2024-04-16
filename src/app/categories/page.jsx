"use client";
import UserTabs from "@/components/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteBtn from "@/components/DeleteBtn";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }
  if (profileLoading) return "Loading user profile...";
  if (!profileData.admin) return "Not an admin...";

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category"
        : "Creating new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error occurred!",
    });
  };

  const handleDeleteClick = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted!",
      error: "Error!",
    });
    fetchCategories();
  };

  const handleCancelBtn = () => {
    setEditedCategory(null);
    setCategoryName("");
  };
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Edit category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            {editedCategory && (
              <button type="button" onClick={handleCancelBtn}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
              key={c._id}
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteBtn
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
