import React from "react";
import { Container, Title, TaskList } from "./Column.styles";
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
        <TaskList>
          {this.props.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TaskList>
      </Container>
    );
  }
}

export default Column;
