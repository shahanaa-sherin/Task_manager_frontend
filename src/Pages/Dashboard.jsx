import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const initialTasks = {
  todo: [
    { id: '1', title: 'Task 1', description: 'Description 1' },
    { id: '2', title: 'Task 2', description: 'Description 2' },
    { id: '3', title: 'Task 3', description: 'Description 3' },
  ],
  inProgress: [],
  done: []
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = Array.from(tasks[source.droppableId]);
    const destinationColumn = Array.from(tasks[destination.droppableId]);
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destinationColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center items-start h-full bg-gray-100 p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(tasks).map((columnKey) => (
            <Droppable droppableId={columnKey} key={columnKey}>
              {(provided) => (
                <div
                  className="w-1/3 bg-white p-4 m-2 rounded-lg shadow-md"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-xl font-bold">{columnKey.toUpperCase()}</h2>
                  {tasks[columnKey].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className="bg-blue-100 p-2 m-2 rounded-lg"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3 className="font-bold">{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
