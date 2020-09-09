import React from "react";
import "./App.css";
import initialData from "./initialData";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {
  state = initialData;

  // onDragStart = () => {
  //   document.body.style.color = "orange";
  //   document.body.style.transition = "background-color 0.2s ease";
  // };

  // onDragUpdate = (update: any) => {
  //   const { destination } = update;
  //   // create variable called opacity to store the percentage of the current index based on all tasks in system
  //   const opacity = destination
  //     ? destination.index / Object.keys(this.state.tasks).length
  //     : 0;
  //   console.log(opacity);

  //   // use the variable to set the background color
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // };

  onDragEnd = (result: any) => {
    console.log(result);
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

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
