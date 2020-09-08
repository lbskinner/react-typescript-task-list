interface ITask {
  id: string;
  content: string;
}

interface ITasks {
  [taskId: string]: ITask;
}

interface IColumn {
  id: string;
  title: string;
  tasksIds: string[];
}

interface IColumns {
  [columnId: string]: IColumn;
}

interface InitialData {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: string[];
}
