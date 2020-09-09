import React from "react";
import "./App.css";
import initialData from "./initialData";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {
  state = initialData;

  onDragEnd = (result: any) => {
    // TODO: reorder our column
  };

  render() {
    return (
      // DragDropContext has three callbacks, onDragStart, onDragUpdate and onDragEnd(which is the only required one)
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId: string) => {
          const column = this.state.columns[columnId];
          const tasks = column.tasksIds.map(
            (taskId) => this.state.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
