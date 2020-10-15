import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../store/mapStoreToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ToolBar = styled.div`
  border: 1px solid lightgray;
  border-radius: 3px;
  position: absolute;
  transform: translateY(-100%);
  left: 50%;
  background-color: white;
`;

const ToolButton = styled.button`
  background: none;
  cursor: pointer;
  font-size: 0.8em;
  outline: 0;
  padding: 2px 6px;
  border: 0;

  &:hover {
    color: #758bfd;
  }
`;

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

type TaskBarProps = {
  taskId: string;
  complete: boolean;
  editTask: boolean;
  handleClickEditTask: (taskId: string) => void;
};

// const spans = document.getElementsByTagName("span");

const TaskBar: React.FC<PropsFromRedux & TaskBarProps> = ({
  taskId,
  complete,
  editTask,
  handleClickEditTask,
  ...props
}) => {
  // const [taskContent, setTaskContent] = useState<string>();
  // const [editTask, setEditTask] = useState<boolean>(false);

  //   const handleClickEdit = (taskId: string) => {
  //     console.log("====================================");
  //     console.log("Edit Button Clicked", taskId);
  //     // const span = document.querySelector(`.${taskId}`);
  //     // console.log(spans);
  //     // console.log(span?.clientWidth);
  //     console.log("====================================");
  //   setEditTask(true);
  //   };

  // const handleSaveTask = () => {

  //   const newState = {
  //     ...props.allTasks,
  //     tasks: {
  //       ...props.allTasks.tasks,
  //       [taskId]: {
  //        ...props.allTasks.tasks[taskId],
  //        content: taskContent,
  //       }
  //     }
  //   }
  // }

  const handleClickDelete = (taskId: string) => {
    console.log("====================================");
    console.log("Delete Button Clicked", taskId);
    console.log("====================================");
  };

  return (
    <ToolBar>
      <ToolButton>
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => handleClickEditTask(taskId)}
        />
      </ToolButton>
      <ToolButton>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleClickDelete(taskId)}
        />
      </ToolButton>
    </ToolBar>
  );
};

export default connect(mapStoreToProps, mapDispatchToProps)(TaskBar);
