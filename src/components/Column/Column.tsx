import React, { KeyboardEvent } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../store/mapStoreToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import {
  Container,
  Title,
  TaskList,
  AddButton,
  TitleWrapper,
  TitleInput,
  DeleteButton,
} from "./Column.styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

type ColumnProps = {
  column: IColumn;
  tasks: ITask[];
  type?: string;
  isDropDisabled?: boolean;
  index: number;
  // handleAddTask: (columnId: string) => void;
};

type InnerListProps = {
  tasks: ITask[];
  columnId: string;
};

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

class InnerList extends React.PureComponent<InnerListProps> {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        columnId={this.props.columnId}
      />
    ));
  }
}

class Column extends React.Component<PropsFromRedux & ColumnProps> {
  titleRef = React.createRef<HTMLInputElement>();
  state = {
    updateColumnTitle: false,
    columnIdClicked: "",
    updatedTitle: "",
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleSaveColumnTitle = () => {
    const columnId = this.state.columnIdClicked;
    this.setState({
      updateColumnTitle: false,
      columnIdClicked: "",
    });
    // if no changes made to title exit function
    if (!this.state.updatedTitle) return;

    const newState = {
      ...this.props.allTasks,
      columns: {
        ...this.props.allTasks.columns,
        [columnId]: {
          ...this.props.allTasks.columns[columnId],
          title: this.state.updatedTitle,
        },
      },
    };

    this.props.updateTaskData(newState);
  };

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.titleRef.current &&
      !this.titleRef.current.contains(event.target as HTMLInputElement)
    ) {
      this.handleSaveColumnTitle();
    }
  };

  handlePressEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      this.handleSaveColumnTitle();
    }
  };

  handleClickColumnTitle = (columnId: string) => {
    this.setState({
      updateColumnTitle: true,
      columnIdClicked: columnId,
    });
  };

  handleTitleInputChange = (event: any) => {
    this.setState({
      ...this.state,
      updatedTitle: event.target.value,
    });
  };

  handleDeleteColumn = (columnId: string) => {
    // pull current columns object from all tasks reducer
    const updatedColumns = this.props.allTasks.columns;
    // check to see if there are tasks in the column the user wants to delete
    if (updatedColumns[columnId].taskIds.length > 0) {
      // if there are tasks in the current column, pop up a window to ask user to confirm
      if (
        window.confirm(
          `Deleting the column will also delete the tasks in this column. Are you sure you want to delete the "${updatedColumns[columnId].title}" column?`
        ) === false
      ) {
        // is user does not want to delete the column with tasks in it, exit
        return;
      }
    }
    // if user wants to delete the column
    // (either no tasks in column or user confirmed deletion)
    // delete the column with using the columnId
    delete updatedColumns[columnId];
    // delete the column from the columnOder array
    const updatedColumnOrder = this.props.allTasks.columnOrder.filter(
      (column) => column !== columnId
    );
    // create new state with updated column data
    const newState = {
      ...this.props.allTasks,
      columns: updatedColumns,
      columnOrder: updatedColumnOrder,
    };
    // set state/reducer with new column data
    this.props.updateTaskData(newState);
  };

  handleAddTask = (columnId: string) => {
    console.log("Add Task Clicked", columnId);
    const currentTaskIds = Object.keys(this.props.allTasks.tasks);
    const lastTaskId = currentTaskIds[currentTaskIds.length - 1];
    const lastTaskIdNum = parseInt(lastTaskId.charAt(lastTaskId.length - 1));
    const newTaskId = `task-${lastTaskIdNum + 1}`;
    const newTaskIdArray = this.props.allTasks.columns[columnId].taskIds;
    newTaskIdArray.push(newTaskId);
    const newState = {
      ...this.props.allTasks,
      tasks: {
        ...this.props.allTasks.tasks,
        [newTaskId]: {
          id: newTaskId,
          content: "New task",
          complete: false,
        },
      },
      columns: {
        ...this.props.allTasks.columns,
        [columnId]: {
          ...this.props.allTasks.columns[columnId],
          taskIds: [...newTaskIdArray],
        },
      },
    };
    this.props.updateTaskData(newState);
  };

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <TitleWrapper {...provided.dragHandleProps}>
              {!this.state.updateColumnTitle &&
              this.props.column.id !== this.state.columnIdClicked ? (
                <Title
                  onClick={() =>
                    this.handleClickColumnTitle(this.props.column.id)
                  }
                >
                  {this.props.column.title}
                </Title>
              ) : (
                <TitleInput
                  type="text"
                  defaultValue={this.props.column.title}
                  onChange={this.handleTitleInputChange}
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  ref={this.titleRef}
                  onKeyDown={this.handlePressEnterKey}
                />
              )}
              <DeleteButton
                type="button"
                onClick={() => this.handleDeleteColumn(this.props.column.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </DeleteButton>
            </TitleWrapper>
            {/* Droppable has on required prop, droppableId 
        two methods to control where the droppable can be dropped
        type - type={this.props.column.id === "column-3" ? "done" : "active"}
        isDropDisabled */}
            {/* Droppable also has a property 'direction' which is set to 'vertical' by default */}
            <Droppable
              droppableId={this.props.column.id}
              //   isDropDisabled={this.props.isDropDisabled}
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList
                    tasks={this.props.tasks}
                    columnId={this.props.column.id}
                  />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            <AddButton
              type="button"
              onClick={() => this.handleAddTask(this.props.column.id)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Column);
