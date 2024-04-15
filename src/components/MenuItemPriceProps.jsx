import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const addProps = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  const editProps = (e, index, type) => {
    const newVal = e.target.value;
    setProps((prevProps) => {
      const newSizes = [...prevProps];
      newSizes[index][type] = newVal;
      return newSizes;
    });
  };

  const removeProps = (index) => {
    setProps((prev) => prev.filter((v, i) => i !== index));
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        className="inline-flex p-1 border-0 justify-start"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen && <IoIosArrowUp className="w-6 h-6" />}
        {!isOpen && <IoIosArrowDown className="w-6 h-6" />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>

      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((prop, index) => (
            <div className="flex items-end gap-2" key={index}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="add.."
                  value={prop.name}
                  onChange={(e) => editProps(e, index, "name")}
                />
              </div>

              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={prop.price}
                  onChange={(e) => editProps(e, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-white mb-3 px-2"
                  onClick={() => removeProps(index)}
                >
                  <GoTrash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProps}
          className="bg-white items-center"
        >
          <FaPlus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
