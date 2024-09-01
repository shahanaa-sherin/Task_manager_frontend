import React, { useState } from 'react';
import TaskCard from '../Components/TaskCard'
import AddCard from '../Components/AddCard'

const Column = ({ title }) => {
  const [cards, setCards] = useState([]);

  const addCard = (text) => {
    if (text) {
      setCards([...cards, text]);
    }
  };

  const deleteCard = (indexToDelete) => {
    setCards(cards.filter((_, index) => index !== indexToDelete));
  };

  const editCard = (indexToEdit, newText) => {
    const updatedCards = cards.map((card, index) =>
      index === indexToEdit ? newText : card
    );
    setCards(updatedCards);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow w-80">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col space-y-2 mb-4">
        {cards.map((card, index) => (
          <TaskCard
            key={index}
            text={card}
            onDelete={() => deleteCard(index)}
            onEdit={(newText) => editCard(index, newText)}
          />
        ))}
      </div>
      <AddCard onAdd={addCard} />
    </div>
  );
};

export default Column;
