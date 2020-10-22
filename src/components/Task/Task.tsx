import React, { KeyboardEvent } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../store/mapStoreToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { Container, ToolButton, TaskText, TaskInput } from "./Task.styles";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import TaskBar from "../TaskBar/TaskBar";

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

type TaskProps = {
  task: ITask;
  index: number;
  columnId: string;
};

class Task extends React.Component<PropsFromRedux & TaskProps> {
  taskRef = React.createRef<HTMLInputElement>();
  state = {
    showToolBar: false,
    taskId: "",
    editTask: false,
    updatedTaskContent: "",
    checkDisabled: false,
    taskIdClicked: "",
  };

  onMouseEnter = (taskId: string) => {
    this.setState({ showToolBar: true, taskId: taskId });
  };

  onMouseLeave = () => {
    this.setState({ showToolBar: false });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleSaveTask = () => {
    const taskId = this.state.taskIdClicked;
    this.setState({
      editTask: false,
      checkDisabled: false,
      taskIdClicked: "",
    });
    if (!this.state.updatedTaskContent) return;

    const newState = {
      ...this.props.allTasks,
      tasks: {
        ...this.props.allTasks.tasks,
        [taskId]: {
          ...this.props.allTasks.tasks[taskId],
          content: this.state.updatedTaskContent,
        },
      },
    };
    this.props.updateTaskData(newState);
  };

  handlePressEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      this.handleSaveTask();
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.taskRef.current &&
      !this.taskRef.current.contains(event.target as HTMLInputElement)
    ) {
      this.handleSaveTask();
    }
  };

  handleClickCheckTask = (taskId: string, complete: boolean) => {
    const newState = {
      ...this.props.allTasks,
      tasks: {
        ...this.props.allTasks.tasks,
        [taskId]: {
          ...this.props.allTasks.tasks[taskId],
          complete: !complete,
        },
      },
    };
    this.props.updateTaskData(newState);
  };

  handleClickEditTask = (taskId: string) => {
    this.setState({
      ...this.state,
      editTask: true,
      checkDisabled: true,
      taskIdClicked: taskId,
    });
  };

  handleTaskInputChange = (event: any) => {
    this.setState({
      ...this.state,
      updatedTaskContent: event.target.value,
    });
  };

  handleClickDeleteTask = (taskId: string, columnId: string) => {
    const updatedTasks = { ...this.props.allTasks.tasks };
    delete updatedTasks[taskId];

    const updatedColumnsTaskIds = [
      ...this.props.allTasks.columns[columnId].taskIds,
    ].filter((task) => task !== taskId);

    const newState = {
      ...this.props.allTasks,
      tasks: updatedTasks,
      columns: {
        ...this.props.allTasks.columns,
        [columnId]: {
          ...this.props.allTasks.columns[columnId],
          taskIds: updatedColumnsTaskIds,
        },
      },
    };
    this.props.updateTaskData(newState);
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            onMouseEnter={() => this.onMouseEnter(this.props.task.id)}
            onMouseLeave={this.onMouseLeave}
            {...provided.draggableProps}
            // dragHandleProps allows users to drag anywhere on the task
            // can also create separate handle component to control where can be dragged
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <ToolButton checkDisabled={this.state.checkDisabled}>
              <FontAwesomeIcon
                icon={this.props.task.complete ? faCheckCircle : faCircle}
                onClick={() =>
                  this.handleClickCheckTask(
                    this.props.task.id,
                    this.props.task.complete
                  )
                }
              />
            </ToolButton>
            {!this.state.editTask ? (
              <>
                <TaskText
                  className={this.props.task.id}
                  complete={this.props.task.complete}
                >
                  {this.props.task.content}
                </TaskText>
                {this.state.showToolBar && (
                  <TaskBar
                    columnId={this.props.columnId}
                    taskId={this.props.task.id}
                    complete={this.props.task.complete}
                    handleClickEditTask={this.handleClickEditTask}
                    handleClickDeleteTask={this.handleClickDeleteTask}
                  />
                )}
              </>
            ) : (
              <TaskInput
                type="text"
                autoFocus
                defaultValue={this.props.task.content}
                onFocus={(e) => e.currentTarget.select()}
                onChange={this.handleTaskInputChange}
                onKeyDown={this.handlePressEnterKey}
                ref={this.taskRef}
              />
            )}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Task);
