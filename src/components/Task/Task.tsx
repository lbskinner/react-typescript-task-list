import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../store/mapStoreToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { Container, ToolButton, TaskText } from "./Task.styles";
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
  state = {
    open: false,
    taskId: "",
  };

  onMouseEnter = (taskId: string) => {
    this.setState({ open: true, taskId: taskId });
  };

  onMouseLeave = () => {
    this.setState({ open: false });
  };

  handleClickCheck = (taskId: string, complete: boolean) => {
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
            <ToolButton>
              <FontAwesomeIcon
                icon={this.props.task.complete ? faCheckCircle : faCircle}
                onClick={() =>
                  this.handleClickCheck(
                    this.props.task.id,
                    this.props.task.complete
                  )
                }
              />
            </ToolButton>
            <TaskText
              className={this.props.task.id}
              complete={this.props.task.complete}
            >
              {this.props.task.content}
            </TaskText>
            {this.state.open && (
              <TaskBar
                taskId={this.props.task.id}
                complete={this.props.task.complete}
              />
            )}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Task);
