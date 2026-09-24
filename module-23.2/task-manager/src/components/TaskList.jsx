// import React from "react";

// import { useState } from "react";
// import { Calendar } from "./ui/calendar";
// import { DatePickerInput } from "./DataPicker";
// import { Pencil, TrashOff } from "lucide-react";
// import { Separator } from "./ui/separator";
import Task from "./Task";

export const TaskList = ({
  tasks,
  getTask,
  onStatusChange,
  onDeleteTask,
  onTaskUpdate,
}) => {
  //   const [date, setDate] = useState(new Date(new Date().getFullYear(), 1, 3));
  //   const bookedDates = Array.from(
  //     { length: 15 },
  //     (_, i) => new Date(new Date().getFullYear(), 1, 12 + i),
  //   );

  return (
    <div className=" w-full min-h-screen">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          getTask={getTask}
          onStatusChange={onStatusChange}
          onDeleteTask={onDeleteTask}
          onTaskUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
};
export default TaskList;
