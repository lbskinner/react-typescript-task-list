import React from "react";

type TaskProps = {
  task: ITask;
};

class Task extends React.Component<TaskProps> {
  render() {
    return this.props.task.content;
  }
}

export default Task;
