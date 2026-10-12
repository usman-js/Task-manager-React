
function TaskCard({ task, onDelete, onEdit, onMove }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-slate-800">
        {task.title}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {task.description}
      </p>

      {task.dueDate && (
        <p className="mt-3 text-sm font-medium text-slate-500">
          Due date: {task.dueDate}
        </p>
      )}

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Task Status
        </label>

        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm outline-none focus:border-indigo-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
