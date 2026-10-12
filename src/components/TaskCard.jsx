
import { useDraggable } from "@dnd-kit/core";

function TaskCard({ task, onDelete, onEdit, onMove }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">
          {task.title}
        </h3>

        <button
          type="button"
          {...listeners}
          {...attributes}
          className="cursor-grab rounded bg-slate-100 px-2 py-1 text-sm text-slate-600 active:cursor-grabbing"
          style={{ touchAction: "none" }}
          aria-label={`Drag ${task.title}`}
        >
          ⠿ Drag
        </button>
      </div>

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
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          type="button"
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
