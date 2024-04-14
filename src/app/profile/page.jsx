"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/UserTabs";
import EditImage from "@/components/EditImage";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [image, setImage] = useState("");
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setAddress(data.address);
          setCity(data.city);
          setPincode(data.pincode);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          address,
          phone,
          city,
          pincode,
        }),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div>
            <div
              className="p-2 rounded-lg relative max-w-[120px]"
              style={{ gridTemplateColumns: ".3fr .7fr" }}
            >
              <EditImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileUpdate}>
            <label>Name</label>
            <input
              type="text"
              placeholder="First & Last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              disabled={true}
              placeholder="email"
              value={session.data.user.email}
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label>Pin Code</label>
                <input
                  type="text"
                  placeholder="Pin code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
