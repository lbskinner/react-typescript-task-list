import React from "react";
import "./App.css";
import initialData from "./initialData";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {
  state = initialData;

  onDragEnd = (result: any) => {
    console.log(result);
    // TODO: reorder our column
    const { destination, source, draggableId } = result;

    if (!destination) return;
    // see if location of draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    // start from this index (source.index) remove 1 item
    newTaskIds.splice(source.index, 1);
    // start from destination index, remove nothing and insert the draggableId
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      // DragDropContext has three callbacks, onDragStart, onDragUpdate and onDragEnd(which is the only required one)
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId: string) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
