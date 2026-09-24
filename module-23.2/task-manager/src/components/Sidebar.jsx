import { ChevronRight, SunMedium, UserShield } from "lucide-react";
import taskLogo from "../assets/tasklogo.svg";
import { Switch } from "./ui/switch";
// import { Checkbox } from "./ui/checkbox";

const Sidebar = () => {
  return (
    <aside className=" hidden w-64 m-4  rounded-2xl shrink-0 bg-white p-6 shadow-sm md:block">
      <div className="flex h-full flex-col justify-between">
        {/*sidebar-header-Brand */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 p-2">
              <img
                src={taskLogo}
                alt="Task Manager"
                className="h-full w-full"
              />
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-800">
                Task Manager
              </h1>

              <p className="text-xs text-slate-500">Plan · Focus · Achieve</p>
            </div>
          </div>

          {/* sidebar-header-Navigation */}
          <nav className="mt-10">
            <ul className="space-y-2">
              <li>
                <button className="w-full rounded-lg bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-600">
                  All Tasks
                </button>
              </li>

              <li>
                <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-100">
                  Pending
                </button>
              </li>

              <li>
                <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-100">
                  Completed
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* side-bar-footer */}
        <div>
          {/* sidebar-footer-light */}
          <div className="flex items-center  justify-between mt-6">
            <div className="flex items-center gap-2 cursor-pointer text-slate-400 ">
              <SunMedium className="text-blue-400" size={20} />
              <p className="text-sm font-display font-medium">Light Mode</p>
            </div>
            <div>
              <Switch className="data-checked:bg-blue-500" />
            </div>
          </div>
          {/* sidebar-footer-profile */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center bg-blue-300 w-full p-2 rounded-2xl gap-2">
              <div>
                {/* jdlogho */}
                <UserShield className="bg-blue-500 h-9 w-9 rounded-full text-white p-1" />
              </div>
              <div>
                {/* jdname */}
                <p className="text-xl font-medium font-display text-slate-800">
                  John Doe
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              {/* poupbutton */}
              <button>
                <ChevronRight className="text-slate-400 text-sm cursor-pointer hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
