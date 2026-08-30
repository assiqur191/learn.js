import { TaskCard } from "./components/TaskCard";
import { allTasks } from "./assets/data/taskListData";
import { useState } from "react";

// import TaskCard from "./components/TaskCard";
export const TaskList = () => {
  const [tasks, setTask] = useState(allTasks);

  const handleDelete = (taksId) => {
    console.log(taksId);
    const excetDelete = tasks.filter((task) => task.id !== taksId);
    setTask(excetDelete);
  };
  return (
    <div className="flex flex-wrap gap-4 pl-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} handleDelete={handleDelete} />
      ))}
    </div>
  );
};
