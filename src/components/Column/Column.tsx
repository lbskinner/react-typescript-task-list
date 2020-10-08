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
  handleAddTask: (columnId: string) => void;
};

type InnerListProps = {
  tasks: ITask[];
};

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

class InnerList extends React.PureComponent<InnerListProps> {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
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
    document.addEventListener("mousedown", this.handleSaveTitle);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleSaveTitle);
  }

  handleSaveTitle = (event: MouseEvent) => {
    if (
      this.titleRef.current &&
      !this.titleRef.current.contains(event.target as HTMLInputElement)
    ) {
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
    }
  };

  handleClickColumnTitle = (columnId: string) => {
    this.setState({
      updateColumnTitle: false,
      columnIdClicked: columnId,
    });
  };

  handleTitleInputChange = (event: any) => {
    this.setState({
      ...this.state,
      updatedTitle: event.target.value,
    });
  };

  handlePressEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
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
    }
  };

  handleDeleteColumn = (columnId: string) => {
    console.log("Delete Column Clicked", columnId);
    const updatedColumns = this.props.allTasks.columns;
    if (updatedColumns[columnId].taskIds.length > 0) {
      if (
        window.confirm(
          `Deleting the column will also delete the tasks in this column. Are you sure you want to delete the "${updatedColumns[columnId].title}" column?`
        ) === false
      ) {
        return;
      }
    }
    console.log("confirmed deletion");
    delete updatedColumns[columnId];
    console.log(updatedColumns);

    const updatedColumnOrder = this.props.allTasks.columnOrder.filter(
      (column) => column !== columnId
    );
    console.log(updatedColumnOrder);

    const newState = {
      ...this.props.allTasks,
      columns: updatedColumns,
      columnOrder: updatedColumnOrder,
    };
    console.log(newState);
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
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            <AddButton
              type="button"
              onClick={() => this.props.handleAddTask(this.props.column.id)}
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
