"use client";
import UserTabs from "../../../components/UserTabs";
import { useProfile } from "../../../components/UseProfile";
import UserForm from "@/components/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  const handleSaveBtn = async (e, data) => {
    e.preventDefault();
    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });
  };
  if (loading) return "Loading user profile...";
  if (!data.admin) return "Not an admin...";

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveBtn} />
      </div>
    </section>
  );
};

export default EditUserPage;
