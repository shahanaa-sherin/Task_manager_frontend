import Column from '../Components/Column'

const Board = () => {
  const columns = ['To Do', 'In Progress', 'Completed'];

  return (
    <div className="flex space-x-4 p-4">
      {columns.map((column, index) => (
        <Column key={index} title={column} />
      ))}
    </div>
  );
};

export default Board;
