import React from "react";
import { Container } from "./Task.styles";
import { Draggable } from "react-beautiful-dnd";
import TaskBar from "../TaskBar/TaskBar";

type TaskProps = {
  task: ITask;
  index: number;
};

class Task extends React.Component<TaskProps> {
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
            <span className={this.props.task.id}>
              {this.props.task.content}
            </span>
            {this.state.open && <TaskBar taskId={this.props.task.id} />}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
