export const TaskCard = ({ task, handleDelete }) => {
  return (
    <div className="shadow-md rounded-md w-52 hover:scale-104 hover:shadow-black/70 px-1 py-1">
      {/* {title} */}
      <p className="text-xl font-bold text-red-500">{task.title}</p>
      {/* description */}
      <p className="text-xs ">{task.description}</p>
      <div className="text-md flex gap-2 py-1">
        {/* status */}
        <p className="text-sm border border-green-400 rounded-full px-1 hover:bg-red-300 hover:border-green-300 hover:cursor-pointer active:scale-95 shadow-md hover:shadow-black/70">
          {task.status}
        </p>
        {/* priotity */}
        <p className="text-sm border border-green-400 rounded-full px-1 hover:bg-red-300 hover:border-green-300 hover:cursor-pointer active:scale-95 shadow-md hover:shadow-black/70">
          {task.priority}
        </p>
      </div>
      <div className=" flex gap-2 py-1">
        {/* category */}
        <p className="text-sm border rounded-full w-fit px-1 border-green-600 py-1 hover:cursor-pointer hover:bg-green-400 hover:border-red-400">
          {task.category}
        </p>
        <p className="text-sm border rounded-full w-fit px-1 border-green-600 py-1 hover:cursor-pointer hover:bg-green-400 hover:border-red-400">
          {task.dueDate}
        </p>
      </div>
      <button
        onClick={() => handleDelete(task.id)}
        className="border bg-red-400 text-white rounded-md cursor-pointer hover:scale-95 px-1 "
      >
        DELETE
      </button>
    </div>
  );
};

export default TaskCard;
