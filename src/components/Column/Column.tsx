import React from "react";
import { Container, Title, TaskList } from "./Column.styles";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";

type ColumnProps = {
  column: IColumn;
  tasks: ITask[];
};

class Column extends React.Component<ColumnProps> {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        {/* Droppable has on required prop, droppableId */}
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
