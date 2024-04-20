"use client";
import { useState } from "react";
import EditImage from "../components/EditImage";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [pincode, setPincode] = useState(user?.pincode || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  return (
    <div className="flex gap-4">
      <div>
        <div
          className="p-2 rounded-lg relative max-w-[120px]"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <EditImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            admin,
            address,
            city,
            pincode,
          })
        }
      >
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
          value={user.email}
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
  );
};

export default UserForm;
