// import React from "react";

// import { useState } from "react";
// import { Calendar } from "./ui/calendar";
// import { DatePickerInput } from "./DataPicker";
// import { Pencil, TrashOff } from "lucide-react";
// import { Separator } from "./ui/separator";
import Task from "./Task";

export const TaskList = ({
  tasks,
  filter,
  onFilterChange,
  onStatusChange,
  onDeleteTask,
  onTaskUpdate,
}) => {
  //   const [date, setDate] = useState(new Date(new Date().getFullYear(), 1, 3));
  //   const bookedDates = Array.from(
  //     { length: 15 },
  //     (_, i) => new Date(new Date().getFullYear(), 1, 12 + i),
  //   );

  const filters = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div className="mt-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onFilterChange(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === item
                ? "bg-blue-500 text-white"
                : "bg-white text-slate-600 hover:bg-blue-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onTaskUpdate}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-slate-500">No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskList;
