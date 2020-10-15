interface ITask {
  id: string;
  content: string;
  complete: boolean;
}

interface ITasks {
  [taskId: string]: ITask;
}

interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

interface IColumns {
  [columnId: string]: IColumn;
}

interface InitialData {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: string[];
}

interface TaskAction {
  type: string;
  payload: InitialData;
}

// type DispatchType = (args: TaskAction) => TaskAction;
