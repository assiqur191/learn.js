import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TimerWidget from "../components/TimerWidget";
// import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { user } = useAuth();
  // const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/tasks");
        setTasks(response.data.data);
        // console.log(user);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      setError("");
      const response = await api.post("/tasks", {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        completed: newTask.status === "Completed",
        dueDate: newTask.dueDate || null,
      });

      const createdTask = response.data.data;

      setTasks((prev) => [...prev, createdTask]);

      alert("Success! Task added successfully.");
    } catch (error) {
      console.error("Failed to add task:", error);
      setError("Failed to add task. Please try again.");
    }
  };

  ////-----------update the task status in the local state (optimistic update)

  const handleStatusChange = async (id) => {
    try {
      setError("");
      const currentTask = tasks.find((task) => task._id === id);

      if (!currentTask) {
        console.error("Task not found for status change:", id);
        alert("Task not found. Please refresh the page and try again.");
        return;
      }

      const newStatus =
        currentTask.status === "Pending"
          ? "In Progress"
          : currentTask.status === "In Progress"
            ? "Completed"
            : "Pending";

      const response = await api.put(`/tasks/${id}`, {
        title: currentTask.title,
        description: currentTask.description,
        status: newStatus,
        completed: newStatus === "Completed",
        dueDate: currentTask.dueDate || null,
      });

      const updatedTask = response.data.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task)),
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Failed to update task status. Please try again.");
      setError("Failed to update task. Please try again.");
    }
  };

  ////-----------update the Task
  const handleTaskUpdate = async (updatedTask) => {
    try {
      setError("");
      const id = updatedTask._id;
      if (!id) {
        console.error("Task ID is missing for update:", updatedTask);
        alert("Task ID is missing. Please refresh the page and try again.");
        return false; // Indicate failure
      }
      const response = await api.put(`/tasks/${id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        completed: updatedTask.status === "Completed",
        dueDate: updatedTask.dueDate || null,
      });

      const updatedTaskData = response.data.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTaskData : task)),
      );

      alert("Success! Task updated successfully.");

      return true; // Indicate success
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Failed to update task. Please try again.");

      // Indicate failure
      return false;
    }
  };
  // setTasks(
  //   tasks.map((task) => {
  //     if (task._id !== id) {
  //       return task;
  //     }

  //     const newStatus =
  //       task.status === "Pending"
  //         ? "In Progress"
  //         : task.status === "In Progress"
  //           ? "Completed"
  //           : "Pending";

  //     return {
  //       ...task,
  //       status: newStatus,
  //       completed: newStatus === "Completed",
  //     };
  //   }),
  // );

  const handleDeleteTask = async (id) => {
    try {
      setError("");
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
      setError("Failed to delete task. Please try again.");
    }
  };
  //   setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  // };
  // const handleTaskUpdate = (updatedTask) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       getTaskId(task) === getTaskId(updatedTask) ? updatedTask : task,
  //     ),
  //   );

  // setTasks((prev) => [...prev, newTask]);
  // alert("Success! Task added successfully.");

  ////---------Filter tasks based on search and filter criteria
  const filteredTask = tasks.filter((task) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (task.title || "").toLowerCase().includes(searchText) ||
      (task.description || "").toLowerCase().includes(searchText);

    const matchFilter = filter === "All" || task.status === filter;

    return matchesSearch && matchFilter;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  // const getTask = (id) => {
  //   return tasks.filter((t) => t._id == id);
  // };
  {
    loading && <p>Loading tasks...</p>;
  }

  {
    !loading && error && <p className="text-red-500">{error}</p>;
  }

  console.log(user);

  return (
    <div className="flex min-h-screen bg-blue-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      <Sidebar filter={filter} onFilterChange={setFilter} user={user} />

      <main className="min-w-0 flex-1 p-6">
        <Header search={search} onSearch={setSearch} user={user} />

        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <SummaryCard
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />
        <div className="mt-6 flex flex-col gap-6 xl:flex-row">
          {/* Main Tasks Section */}
          <div className="min-w-0 flex-1 space-y-6">
            <TaskForm onAddTask={handleAddTask} />

            {loading && <p>Loading tasks...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
              <TaskList
                tasks={filteredTask}
                filter={filter}
                onFilterChange={setFilter}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
                onTaskUpdate={handleTaskUpdate}
              />
            )}
          </div>

          {/* Right Timer Section */}
          <div className="w-full xl:w-80 2xl:w-96 flex-shrink-0">
            <div className="sticky top-6">
              <TimerWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
