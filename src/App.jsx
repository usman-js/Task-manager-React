import { useEffect, useReducer } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import taskReducer from "./reducer/taskReducer";
import { TaskProvider } from "./context/TaskContext";

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
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks, () => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
  function moveTask(id, status) {
    dispatch({
      type: "MOVE_TASK",
      payload: {
        id,
        status,
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
      task.description,
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

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">My Task Board</h1>

          <p className="mt-2 text-slate-500">
            Organize your tasks and track your progress.
          </p>
        </header>

        <TaskProvider
          value={{ tasks, addTask, deleteTask, editTask, moveTask }}
        >
          <TaskForm onAddTask={addTask} />
          <Board />
        </TaskProvider>
      </div>
    </main>
  );
}

export default App;
