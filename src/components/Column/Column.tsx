import React from "react";
import { Container, Title, TaskList, AddButton } from "./Column.styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type ColumnProps = {
  column: IColumn;
  tasks: ITask[];
  type?: string;
  isDropDisabled?: boolean;
  index: number;
  handleAddTask: (columnId: string) => void;
};

type InnerListProps = {
  tasks: ITask[];
};

class InnerList extends React.PureComponent<InnerListProps> {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

class Column extends React.Component<ColumnProps> {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            {/* Droppable has on required prop, droppableId 
        two methods to control where the droppable can be dropped
        type - type={this.props.column.id === "column-3" ? "done" : "active"}
        isDropDisabled */}
            {/* Droppable also has a property 'direction' which is set to 'vertical' by default */}
            <Droppable
              droppableId={this.props.column.id}
              //   isDropDisabled={this.props.isDropDisabled}
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            <AddButton
              type="button"
              onClick={() => this.props.handleAddTask(this.props.column.id)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Column;
