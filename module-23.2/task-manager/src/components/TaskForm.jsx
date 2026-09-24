import { BookmarkPlus, CirclePlus } from "lucide-react";
// import React from "react";

export const TaskForm = () => {
  return (
    <div className="flex md:w-auto flex-col md:flex-row items-center gap-5  bg-white rounded-2xl shadow-md  p-5 mt-4">
      {/* search */}
      <div className="flex basis-[60%] items-center gap-2 rounded-full border border-slate-400 bg-white px-4 py-1 transition focus-within:ring-2 focus-within:ring-blue-500 ">
        <CirclePlus className="h-10 w-10 text-white bg-blue-500 rounded-full" />
        <input
          type="text"
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
          placeholder="Add a task..."
        />
      </div>
      {/* button */}
      <div>
        <button className="mt-4 md:mt-0 rounded-2xl bg-blue-400 px-4 py-2 w-40 text-sm font-medium text-white hover:bg-blue-500 cursor-pointer flex items-center gap-2">
          <BookmarkPlus />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};
export default TaskForm;
