import React from "react";
import initialData from "./initialData";
import Column from "./components/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "./App.styles";

class App extends React.Component {
  state = initialData;

  onDragStart = (start: any) => {
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex,
    });
  };

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
    this.setState({
      homeIndex: null,
    });
    console.log(result);
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;
    // do nothing if item is dropped outside of the list
    if (!destination) return;
    // do nothing if item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // start column
    const start = this.state.columns[source.droppableId];
    // finish column
    const finish = this.state.columns[destination.droppableId];
    // if item was moved within the same column
    if (start === finish) {
      // create a new array that contains the current items
      const newTaskIds = Array.from(start.taskIds);
      // start from this index (source.index) remove 1 item
      // remove the item dragged from it's original position
      newTaskIds.splice(source.index, 1);
      // start from destination index, remove nothing and insert the draggableId
      // insert the dragged item to the new position
      newTaskIds.splice(destination.index, 0, draggableId);
      // create new, updated object with current id data order for columns
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      // create new state data with updated column data
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      // set state with new column data
      this.setState(newState);
      return;
    }

    // Moving items from one list to another
    // create a new array that contains the same taskIds as the old array
    const startTaskIds = Array.from(start.taskIds);
    // remove the dragged item from the array created above
    startTaskIds.splice(source.index, 1);
    // create a new start (source) column with contains the same properties as the old column
    // but with the new startTaskIds array - does not include the dragged item
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    // create a new array that includes all items in the destination list/column
    const finishTaskIds = Array.from(finish.taskIds);
    // insert the dragged item into the new array created above
    finishTaskIds.splice(destination.index, 0, draggableId);
    // create new, updated object for destination column
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    // create new state data with updated column data for both source and destination columns
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState, () => console.log(this.state));
  };

  render() {
    return (
      // DragDropContext has three callbacks, onDragStart, onDragUpdate and onDragEnd(which is the only required one)
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId: string, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => this.state.tasks[taskId]
            );
            // good use to prevent back drag
            const isDropDisabled = index < this.state.homeIndex;

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

export default App;
