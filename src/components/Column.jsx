
import TaskCard from "./TaskCard";

function Column({ title, status, tasks, onDelete, onEdit, onMove }) {
  return (
    <div className="min-h-64 rounded-xl bg-slate-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          {title}
        </h2>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onMove={onMove}
          />
        ))}

        {tasks.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
}

export default Column;
