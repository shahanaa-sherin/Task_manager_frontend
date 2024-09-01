import { useState } from 'react';

const AddCard = ({ onAdd }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [cardText, setCardText] = useState('');

  const handleAddCard = () => {
    onAdd(cardText);
    setCardText('');
    setInputVisible(false);
  };

  return (
    <div className="mt-2">
      {inputVisible ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={cardText}
            onChange={(e) => setCardText(e.target.value)}
            placeholder="Enter card text"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddCard}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Card
          </button>
        </div>
      ) : (
        <button
          onClick={() => setInputVisible(true)}
          className="text-blue-500 hover:underline"
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default AddCard;
