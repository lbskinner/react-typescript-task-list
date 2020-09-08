interface Task {
  id: string;
  content: string;
}

interface Tasks {
  task: Task;
}

interface Column {
  id: string;
  title: string;
  tasksIds: string[];
}

interface Columns {
  column: Column;
}

interface InitialData {
  tasks: Tasks;
  columns: Columns;
  columnOrder: string[];
}
