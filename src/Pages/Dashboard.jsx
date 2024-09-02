import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const initialColumns = {
  [uuidv4()]: {
    name: 'To Do',
    items: [],
  },
  [uuidv4()]: {
    name: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    name: 'Completed',
    items: [],
  },
};

function Dashboard() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');
  const [isAddingTask, setIsAddingTask] = useState({});

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const addTask = (columnId) => {
    if (newTask.trim() === '') return;
    const column = columns[columnId];
    const updatedItems = [
      { id: uuidv4(), content: newTask },
      ...column.items,
    ];
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
    setNewTask('');
    setIsAddingTask({ ...isAddingTask, [columnId]: false });
  };

  const editTask = (columnId, taskId, newContent) => {
    const column = columns[columnId];
    const updatedItems = column.items.map((item) =>
      item.id === taskId ? { ...item, content: newContent } : item
    );
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  const deleteTask = (columnId, taskId) => {
    const column = columns[columnId];
    const updatedItems = column.items.filter((item) => item.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="grid grid-cols-4 justify-evenly gap-5">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-200 p-4 rounded-lg min-h-[200px] shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{column.name}</h2>
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 rounded mb-2 shadow"
                          >
                            <div className="flex justify-between items-center">
                              <span>{item.content}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    editTask(columnId, item.id, prompt('Edit Task', item.content))
                                  }
                                  className="text-blue-500 hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTask(columnId, item.id)}
                                  className="text-red-500 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <div>
                    {isAddingTask[columnId] ? (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          className="border p-1 rounded w-full"
                          placeholder={`Add a new task to ${column.name}`}
                        />
                        <button
                          onClick={() => addTask(columnId)}
                          className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
                        >
                          Add Task
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddingTask({ ...isAddingTask, [columnId]: true })}
                        className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
                      >
                        Add a card
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
