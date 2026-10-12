
import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Column from "./Column";
import { useTasks } from "../context/TaskContext";

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
];

function Board() {
  const [search, setSearch] = useState("");
  const { tasks, deleteTask, editTask, moveTask } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const validStatuses = columns.map((column) => column.status);

    if (validStatuses.includes(newStatus)) {
      moveTask(taskId, newStatus);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-5 w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500"
      />

      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {columns.map((column) => (
            <Column
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={filteredTasks.filter(
                (task) => task.status === column.status
              )}
              onDelete={deleteTask}
              onEdit={editTask}
              onMove={moveTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Board;
