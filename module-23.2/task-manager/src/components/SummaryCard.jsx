// import React from "react";

import { Check, Clock, Menu, Sparkles, StarCheck } from "lucide-react";

export const SummaryCard = ({ totalTasks, completedTasks, pendingTasks }) => {
  return (
    <div>
      <div className=" mt-6 flex flex-col flex-wrap gap-4 md:flex-row ">
        {/* total tasks */}
        <div className="flex flex-col border border-black bg-[#c8deef]   p-5 w-70 rounded-2xl mt-4">
          <Menu className="text-white bg-blue-400 h-10 w-10 rounded-full p-2" />
          <p className="font-semibold font-display text-lg pt-2">Total Tasks</p>
          <h1 className="text-3xl font-bold pt-2">{totalTasks}</h1>
          <p className="pt-2 text-slate-500">All tasks in your list</p>
        </div>
        {/* completed tasks */}
        <div className="flex flex-col border border-black bg-[#9fe4b7]   p-5 w-70 rounded-2xl mt-4">
          <Check className="text-white bg-green-500 h-10 w-10 rounded-full p-2" />
          <p className="font-semibold font-display text-lg pt-2">
            Completed Tasks
          </p>
          <h1 className="text-3xl font-bold pt-2">{completedTasks}</h1>
          <p className="pt-2 text-slate-500 ">Tasks you have completed</p>
        </div>
        {/* pending tasks */}
        <div className="flex flex-col border border-black bg-[#FCF7F1]   p-5 w-70 rounded-2xl mt-4">
          <Clock className="text-white  bg-[#e5ac66] h-10 w-10 rounded-full p-2" />
          <p className="font-semibold font-display text-lg pt-2">Pending</p>
          <h1 className="text-3xl font-bold pt-2">{pendingTasks}</h1>
          <p className="pt-2 text-slate-500 ">Still to be done</p>
        </div>
        {/* Keep going */}
        <div className="flex flex-col border border-black bg-[#dcc8ef]   p-5 w-70 rounded-2xl mt-4">
          <StarCheck className="text-white  bg-[#9d53e6] h-10 w-10 rounded-full p-2" />
          <p className="font-semibold font-display text-lg pt-2">Keep Going</p>
          {/* <h1 className="text-3xl font-bold pt-2">3</h1> */}
          <p className="pt-2 text-slate-500 flex items-center gap-2">
            Progress builds
            <br /> big dreams
            <Sparkles className="text-yellow-400" />
          </p>
        </div>
      </div>
      {/* <div className="flex gap-4 mt-2">
        <button className="mt-6 rounded-2xl bg-blue-500 px-4 py-2 w-25 text-sm font-medium text-white hover:bg-blue-600 cursor-pointer">
          All
        </button>
        <button className="mt-6 rounded-2xl bg-[#c8deef] px-4 py-2 w-25 text-sm font-medium text-black hover:bg-blue-600  hover:text-white cursor-pointer">
          Pending
        </button>
        <button className="mt-6 rounded-2xl bg-[#c8deef] px-4 py-2 w-25 text-sm font-medium text-black hover:bg-blue-600  hover:text-white cursor-pointer">
          Completed
        </button>
      </div> */}
    </div>
  );
};
export default SummaryCard;
