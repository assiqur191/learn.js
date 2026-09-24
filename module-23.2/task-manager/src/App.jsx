import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Understand components, state and props",
      status: "In Progress",
      completed: false,
      dueDate: "2026-09-24",
    },
    {
      id: 2,
      title: "Practice JavaScript",
      description: "Solve 3 array and string problems",
      status: "Pending",
      completed: false,
      dueDate: "2026-09-23",
    },
    {
      id: 3,
      title: "Build Task Manager UI",
      description: "Complete the dashboard design using Tailwind CSS",
      status: "Completed",
      completed: true,
      dueDate: "2026-09-20",
    },
    {
      id: 4,
      title: "Learn useEffect",
      description: "Understand effects and dependency arrays",
      status: "Pending",
      completed: false,
      dueDate: "2026-09-25",
    },
    {
      id: 5,
      title: "Practice React Forms",
      description: "Build a form using React Hook Form",
      status: "In Progress",
      completed: false,
      dueDate: "2026-09-26",
    },
    {
      id: 6,
      title: "Learn React Router",
      description: "Create multiple pages and navigation",
      status: "Pending",
      completed: false,
      dueDate: "2026-09-28",
    },
    {
      id: 7,
      title: "Build Express API",
      description: "Create CRUD APIs for the task manager",
      status: "Completed",
      completed: true,
      dueDate: "2026-09-18",
    },
    {
      id: 8,
      title: "Connect MongoDB",
      description: "Connect the task manager backend with MongoDB",
      status: "Pending",
      completed: false,
      dueDate: "2026-09-30",
    },
    {
      id: 9,
      title: "Practice Tailwind CSS",
      description: "Build responsive layouts using Tailwind",
      status: "Completed",
      completed: true,
      dueDate: "2026-09-19",
    },
    {
      id: 10,
      title: "Build Authentication",
      description: "Implement login, register and JWT authentication",
      status: "Pending",
      completed: false,
      dueDate: "2026-10-02",
    },
  ]);

  const handleStatusChange = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const newStatus =
          task.status === "Pending"
            ? "In Progress"
            : task.status === "In Progress"
              ? "Completed"
              : "Pending";

        return {
          ...task,
          status: newStatus,
          completed: newStatus === "Completed",
        };
      }),
    );
  };
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleTaskUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  // const getTask = (id) => {
  //   return tasks.filter((t) => t.id == id);
  // };

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <Header />
        <SummaryCard />
        <TaskForm />
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          onTaskUpdate={handleTaskUpdate}
        />
      </main>
    </div>
  );
};

export default App;
