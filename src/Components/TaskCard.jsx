import { useState } from 'react';

const Card = ({ text, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-2 rounded shadow flex justify-between items-center">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border p-1 rounded w-full"
        />
      ) : (
        <span>{text}</span>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-500 hover:text-green-700"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
