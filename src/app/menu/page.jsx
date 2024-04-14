"use client";

import Link from "next/link";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/UserTabs";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

const MenuPage = () => {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  if (loading) return "Loading user info...";
  if (!data.admin) return "Not an admin...";

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu/new"}>
          <span>Create new menu item</span>
          <FaRegArrowAltCircleRight className="mt-1" />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
                key={item._id}
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt="item image"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
