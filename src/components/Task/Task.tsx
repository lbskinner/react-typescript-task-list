import React from "react";
import { Container } from "./Task.styles";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

type TaskProps = {
  task: ITask;
  index: number;
};

class Task extends React.Component<TaskProps> {
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
            {this.props.task.content}
            <button>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
