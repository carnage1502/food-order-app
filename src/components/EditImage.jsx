import Image from "next/image";
import { imageDb } from "@/libs/fireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function EditImage({ link, setLink }) {
  const handleFileChange = async (e) => {
    const files = e.target.files[0];
    if (!files) return;
    const fileName = `${uuidv4()}`;
    const imageRef = ref(imageDb, `files/${fileName}`);
    try {
      await uploadBytes(imageRef, files);
      const url = await getDownloadURL(imageRef);
      setLink(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
}
