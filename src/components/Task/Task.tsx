import React from "react";
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
    document.addEventListener("mousedown", this.handleSaveTask);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleSaveTask);
  }

  handleSaveTask = (event: MouseEvent) => {
    if (
      this.taskRef.current &&
      !this.taskRef.current.contains(event.target as HTMLInputElement)
    ) {
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

  render() {
    // const isDragDisabled: boolean = this.props.task.id === "task-1";
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        // isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            onMouseEnter={() => this.onMouseEnter(this.props.task.id)}
            onMouseLeave={this.onMouseLeave}
            {...provided.draggableProps}
            // leave the dragHandleProps here allows users to drag anywhere on the task
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            // included for style
            // isDragDisabled={isDragDisabled}
          >
            {/* created separate handle component allows users to only able to drag on the component */}
            {/* <Handle {...provided.dragHandleProps} /> */}
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
                    taskId={this.props.task.id}
                    complete={this.props.task.complete}
                    editTask={this.state.editTask}
                    handleClickEditTask={this.handleClickEditTask}
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
