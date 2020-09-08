const initialData: InitialData = {
  tasks: {
    task: { id: "task-1", content: "Take out the garbage" },
  },
  columns: {
    column: {
      id: "column-1",
      title: "To do",
      tasksIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

export default initialData;
