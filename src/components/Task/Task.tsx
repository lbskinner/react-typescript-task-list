import React from "react";
import { Container, Handle } from "./Task.styles";
import { Draggable } from "react-beautiful-dnd";

type TaskProps = {
  task: ITask;
  index: number;
};

class Task extends React.Component<TaskProps> {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            // leave the dragHandleProps here allows users to drag anywhere on the task
            // {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* created separate handle component allows users to only able to drag on the component */}
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
