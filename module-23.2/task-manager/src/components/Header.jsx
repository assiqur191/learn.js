import arrow from "../assets/arrow-through-heart-fill.svg";
import search from "../assets/search.svg";
import addcheck from "../assets/check-circle-16-solid.svg";

export default function Header() {
  return (
    <header className="bg-white shadow w-full">
      {/* 1. Changed "flex" to "flex flex-col md:flex-row md:items-center" */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
        {/* User Info */}
        <div className="flex flex-col items-start w-full md:w-auto">
          <p className="text-xs text-slate-500">Good Morning,</p>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center flex-wrap">
            John Doe
            <img
              src={arrow}
              alt="arrow"
              className="h-6 w-6 sm:h-8 sm:w-8 ml-2 object-contain"
            />
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Search & button */}
        {/* 2. Changed to flex-col on small viewports, row layout on small devices and above */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
          {/* Search Input Box */}
          {/* 3. Removed hardcoded px-4 inside input to prevent input box blow-out */}
          <div className="flex items-center flex-1 sm:flex-none gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 transition focus-within:ring-2 focus-within:ring-blue-500">
            <img src={search} alt="search" className="h-4 w-4 shrink-0" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Action Button Wrapper */}
          <div className="flex shrink-0">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer bg-blue-400 rounded-2xl px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
              <img
                src={addcheck}
                alt="add check"
                className="h-4 w-4 shrink-0"
              />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
