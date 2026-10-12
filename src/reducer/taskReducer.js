function taskReducer(tasks, action) {
  switch (action.type) {
    case "LOAD_TASKS":
    return action.payload;
    case "ADD_TASK":
      return [...tasks, action.payload];

    case "DELETE_TASK":
      return tasks.filter((task) => task.id !== action.payload);

    case "UPDATE_TASK":
      return tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task
      );

    case "MOVE_TASK":
      return tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );

    default:
      return tasks;
  }
}

export default taskReducer;