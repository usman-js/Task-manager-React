
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import taskReducer from "./reducer/taskReducer";
import { TaskProvider } from "./context/TaskContext";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=6";

const initialTasks = [
  {
    id: 1,
    title: "Build navbar",
    description: "Building a navbar for a website",
    dueDate: "",
    status: "todo",
  },
  {
    id: 2,
    title: "Product page",
    description: "Creating the product page for the store",
    dueDate: "",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Setup project",
    description: "Setting up the development environment",
    dueDate: "",
    status: "done",
  },
];

function App() {
  const [tasks, dispatch] = useReducer(
    taskReducer,
    initialTasks,
    () => {
      try {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : initialTasks;
      } catch {
        return initialTasks;
      }
    }
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);

        const apiTasks = response.data.map((item) => ({
          id: item.id + 1000,
          title: item.title,
          description: `Task from API: ${item.title}`,
          dueDate: "",
          status: item.completed ? "done" : "todo",
        }));

        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          dispatch({
            type: "LOAD_TASKS",
            payload: parsedTasks,
          });
        } else {
          dispatch({
            type: "LOAD_TASKS",
            payload: apiTasks,
          });
        }
      } catch (err) {
        setError("Unable to load tasks. Please try again.");

        try {
          const savedTasks = localStorage.getItem("tasks");

          if (!savedTasks) {
            dispatch({
              type: "LOAD_TASKS",
              payload: initialTasks,
            });
          }
        } catch {
          dispatch({
            type: "LOAD_TASKS",
            payload: initialTasks,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  function addTask(newTask) {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        status: "todo",
      },
    });
  }

  function deleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  function editTask(task) {
    const newTitle = prompt("Enter the updated task title:", task.title);

    if (newTitle === null || !newTitle.trim()) return;

    const newDescription = prompt(
      "Enter the updated task description:",
      task.description
    );

    if (newDescription === null || !newDescription.trim()) return;

    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: task.id,
        title: newTitle.trim(),
        description: newDescription.trim(),
      },
    });
  }

  function moveTask(id, status) {
    dispatch({
      type: "MOVE_TASK",
      payload: { id, status },
    });
  }

  function retryFetch() {
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            My Task Board
          </h1>
          <p className="mt-2 text-slate-500">
            Organize your tasks and track your progress.
          </p>
        </header>

        {loading ? (
          <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">
            Loading tasks...
          </p>
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
              >
                <p>{error}</p>
                <button
                  type="button"
                  onClick={retryFetch}
                  className="mt-2 rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                >
                  Try Again
                </button>
                <p className="mt-2 text-sm">
                  Showing your saved or sample tasks where available.
                </p>
              </div>
            )}

            <TaskProvider
              value={{ tasks, addTask, deleteTask, editTask, moveTask }}
            >
              <TaskForm onAddTask={addTask} />
              <Board />
            </TaskProvider>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
