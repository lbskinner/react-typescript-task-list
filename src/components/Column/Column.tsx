import React, { Component } from "react";

type ColumnProps = {
  column: IColumn;
  tasks: ITask[];
};

class Column extends Component<ColumnProps> {
  render() {
    return this.props.column.title;
  }
}

export default Column;
