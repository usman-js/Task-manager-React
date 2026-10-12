
import { createContext, useContext } from "react";

const TaskContext = createContext();

export function TaskProvider({ children, value }) {
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
