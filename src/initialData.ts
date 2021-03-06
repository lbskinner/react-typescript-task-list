const initialData: InitialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content:
        "Hover over ☰ at the top left of the screen on nav bar to add new column",
      complete: false,
    },
    "task-2": {
      id: "task-2",
      content: "Click on column title text to edit column title",
      complete: false,
    },
    "task-3": {
      id: "task-3",
      content: "Hover over individual task to view more options",
      complete: false,
    },
    "task-4": {
      id: "task-4",
      content: "Click on circle in each task to check or uncheck task",
      complete: false,
    },
    "task-5": { id: "task-5", content: "Drag tasks between columns", complete: false },
    "task-6": { id: "task-6", content: "Drag columns to reorder them", complete: false },
    "task-7": { id: "task-7", content: "Make dinner", complete: false },
    "task-8": { id: "task-8", content: "Pay bills", complete: false },
    "task-9": {
      id: "task-9",
      content: "Make dentist appointment",
      complete: false,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Tutorial",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "Ethan's Tasks",
      taskIds: ["task-5", "task-6"],
    },
    "column-3": {
      id: "column-3",
      title: "Leila's Tasks",
      taskIds: ["task-7", "task-8", "task-9"],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
