// import React from 'react'
import { DatePickerInput } from "./DataPicker";
import { TrashOff } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "cn";
import EditTask from "./EditTask";

export const Task = ({
  task,
  getTask,
  onStatusChange,
  onDeleteTask,
  onTaskUpdate,
}) => {
  return (
    <div>
      {/* main div */}
      <TaskDetail
        task={task}
        getTask={getTask}
        onStatusChange={onStatusChange}
        onDeleteTask={onDeleteTask}
        onTaskUpdate={onTaskUpdate}
      />
      <Separator />
    </div>
  );
};

export default Task;

const TaskDetail = ({ task, onStatusChange, onDeleteTask, onTaskUpdate }) => {
  return (
    <div className="flex flex-col md:flex-row items-center  bg-white rounded-2xl shadow-md  p-5 mt-4">
      {/* task items */}
      <div className="flex basis-[50%] items-center gap-4 rounded-full  p-4 transition focus-within:ring-2 focus-within:ring-blue-500 ">
        <label>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
          />
        </label>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-slate-700">{task.title}</h2>
          <p className="text-sm text-slate-700">{task.description}</p>
        </div>
      </div>
      {/* status, date */}
      <div className="flex flex-col md:flex-row basis-[30%] items-center   rounded-full  bg-white p-4 transition  ">
        <button
          onClick={() => onStatusChange(task.id)}
          className={cn(
            " border text-white py-2 px-4 rounded-full  transition active:scale-95 bg-[#a654dc]",
            task.status === "Pending" && "bg-purple-500 hover:bg-purple-600",
            task.status === "In Progress" &&
              "bg-yellow-500 hover:bg-yellow-600",
            task.status === "Completed" && "bg-green-500 hover:bg-green-600",
          )}
        >
          {task.status}
        </button>
        <DatePickerInput />
      </div>
      {/* edit , delete */}
      <div className="flex basis-[20%] items-center gap-4 rounded-full  bg-white p-4 transition  ">
        {/* <div>
          <Pencil className=" hover:bg-green-400 hover:rounded-full hover:text-white p-2 h-11 w-11" />
        </div> */}
        <EditTask task={task} onTaskUpdate={onTaskUpdate} />
        <button onClick={() => onDeleteTask(task.id)}>
          <TrashOff className=" hover:bg-red-400 hover:rounded-full hover:text-white p-2 h-11 w-11" />
        </button>
      </div>
    </div>
  );
};
