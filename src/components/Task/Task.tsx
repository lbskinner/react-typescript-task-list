import React from "react";
import { Container } from "./Task.styles";

type TaskProps = {
  task: ITask;
};

class Task extends React.Component<TaskProps> {
  render() {
    return <Container>{this.props.task.content}</Container>;
  }
}

export default Task;
