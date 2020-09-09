import React from "react";
import { Container } from "./Task.styles";
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
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
