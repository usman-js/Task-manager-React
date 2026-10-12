
import { useRef, useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const titleInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !dueDate) {
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate("");

    titleInputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2"
    >
      <input
        ref={titleInputRef}
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500"
        required
      />

      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500"
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500 sm:col-span-2"
        required
      />

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 sm:col-span-2"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
