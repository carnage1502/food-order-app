"use client";
import UserTabs from "../../components/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
const UsersPage = () => {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);
  if (loading) return "Loading user info...";
  if (!data.admin) return "Not an admin...";
  return (
    <section className="max-w-2xl max-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-700">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              {/* <div>
                <Link href={"/users/" + users._id} className="button">
                  Edit
                </Link>
              </div> */}
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
