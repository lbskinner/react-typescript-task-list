import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "./store/mapStoreToProps";
import mapDispatchToProps from "./store/mapDispatchToProps";
import Column from "./components/Column/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import NavBar from "./components/NavBar/NavBar";

const Container = styled.div`
  display: flex;
`;

const OutterContainer = styled.div`
  margin: 10px;
`;

type ColumnProps = {
  column: IColumn;
  taskMap: ITasks;
  type?: string;
  isDropDisabled?: boolean;
  index: number;
  handleAddTask: (columnId: string) => void;
};

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

class InnerList extends React.PureComponent<ColumnProps> {
  render() {
    const { column, taskMap, index, handleAddTask } = this.props;
    const tasks = column.taskIds.map((taskId: string) => taskMap[taskId]);
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
        handleAddTask={handleAddTask}
      />
    );
  }
}

class App extends React.Component<PropsFromRedux> {
  onDragEnd = (result: any) => {
    console.log(result);
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId, type } = result;
    // do nothing if item is dropped outside of the list
    if (!destination) return;
    // do nothing if item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.props.allTasks.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.props.allTasks,
        columnOrder: newColumnOrder,
      };

      this.props.updateTaskData(newState);
      return;
    }

    // start column
    const start = this.props.allTasks.columns[source.droppableId];
    // finish column
    const finish = this.props.allTasks.columns[destination.droppableId];
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
        ...this.props.allTasks,
        columns: {
          ...this.props.allTasks.columns,
          [newColumn.id]: newColumn,
        },
      };
      // set state with new column data
      this.props.updateTaskData(newState);
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
      ...this.props.allTasks,
      columns: {
        ...this.props.allTasks.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.props.updateTaskData(newState);
  };

  handleAddColumn = () => {
    console.log("Add Column Clicked");
    const newColumnId = `column-${this.props.allTasks.columnOrder.length + 1}`;
    const newState = {
      ...this.props.allTasks,
      columns: {
        ...this.props.allTasks.columns,
        [newColumnId]: {
          id: newColumnId,
          title: "New Column",
          taskIds: [],
        },
      },
      columnOrder: [...this.props.allTasks.columnOrder, newColumnId],
    };
    this.props.updateTaskData(newState);
  };

  handleAddTask = (columnId: string) => {
    console.log("Add Task Clicked", columnId);
  };

  render() {
    return (
      <>
        <NavBar handleAddColumn={this.handleAddColumn} />
        {/* DragDropContext has three callbacks, onDragStart, onDragUpdate and
        onDragEnd(which is the only required one) */}
        <OutterContainer>
          <DragDropContext
            // onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                  {this.props.allTasks.columnOrder.map(
                    (columnId: string, index) => {
                      const column = this.props.allTasks.columns[columnId];
                      // good use to prevent back drag
                      // const isDropDisabled = index < this.state.homeIndex;
                      // isDropDisabled={isDropDisabled}

                      return (
                        <InnerList
                          key={column.id}
                          column={column}
                          taskMap={this.props.allTasks.tasks}
                          index={index}
                          handleAddTask={() => this.handleAddTask(columnId)}
                        />
                      );
                    }
                  )}
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          </DragDropContext>
        </OutterContainer>
      </>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
