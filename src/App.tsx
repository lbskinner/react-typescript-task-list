import React from "react";
import "./App.css";
import initialData from "./initialData";
import Column from "./components/Column/Column";

class App extends React.Component {
  state = initialData;

  render() {
    return this.state.columnOrder.map((columnId: string) => {
      const column = this.state.columns[columnId];
      const tasks = column.tasksIds.map((taskId) => this.state.tasks[taskId]);
      return <Column key={column.id} column={column} tasks={tasks} />;
    });
  }
}

export default App;
