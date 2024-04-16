import { useState } from "react";

const DeleteBtn = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              className="primary"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes!
            </button>
            <button type="button" onClick={() => setShowConfirm(false)}>
              No!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
};

export default DeleteBtn;
