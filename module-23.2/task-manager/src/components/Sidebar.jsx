import { ChevronRight, SunMedium, UserShield, LogOut } from "lucide-react";
import { useState } from "react";

import taskLogo from "../assets/tasklogo.svg";
import { Switch } from "./ui/switch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ filter, onFilterChange, user }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    setLogoutError("");
    setLogoutLoading(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setLogoutError(
        error.response?.data?.message || "Logout failed try again.",
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 m-4 h-[calc(100vh-2rem)] sticky top-4 shrink-0 rounded-2xl bg-white dark:bg-black p-6 shadow-sm">
      {/* Top Section: Brand + Navigation */}
      <div className="flex flex-col min-h-0">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 p-2">
            <img src={taskLogo} alt="Task Manager" className="h-full w-full" />
          </div>

          <div>
            <h1 className="text-base font-bold text-slate-800 dark:text-white">
              Task Manager
            </h1>
            <p className="text-xs text-slate-500">Plan · Focus · Achieve</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onFilterChange("All")}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                  filter === "All"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                }`}
              >
                All Tasks
              </button>
            </li>

            <li>
              <button
                onClick={() => onFilterChange("Pending")}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                  filter === "Pending"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                }`}
              >
                Pending
              </button>
            </li>

            <li>
              <button
                onClick={() => onFilterChange("Completed")}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                  filter === "Completed"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                }`}
              >
                Completed
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Theme Switch & Profile */}
      <div className="shrink-0 pt-4">
        {/* Dark mode switch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
            <SunMedium className="text-blue-400" size={20} />
            <p className="text-sm font-medium">
              {isDark ? "Dark Mode" : "Light Mode"}
            </p>
          </div>

          <Switch
            checked={isDark}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
            className="data-checked:bg-blue-500"
          />
        </div>

        {/* Profile */}
        <div className="relative mt-6 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-blue-300 dark:bg-slate-800 p-2">
            <UserShield className="h-9 w-9 shrink-0 rounded-full bg-blue-500 p-1 text-white" />

            <div className="min-w-0">
              <p className="truncate text-base font-medium text-slate-800 dark:text-white">
                {user?.name || user?.email || "User"}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                My account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowProfileMenu((previous) => !previous)}
            aria-label="Toggle profile menu"
            aria-expanded={showProfileMenu}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight
              className={`h-4 w-4 text-slate-500 transition-transform ${
                showProfileMenu ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Popup menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full right-0 z-50 mb-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <p className="truncate px-3 py-2 text-xs text-slate-500">
                Signed in as {user?.email || user?.name || "User"}
              </p>

              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>

              {logoutError && (
                <p role="alert" className="px-3 py-2 text-xs text-red-600">
                  {logoutError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
