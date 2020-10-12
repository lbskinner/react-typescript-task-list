import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
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
  padding: 2px 4px;
  border: 0;

  &:hover {
    color: #758bfd;
  }
`;

type TaskBarProps = {
  taskId: string;
};

const TaskBar: React.FC<TaskBarProps> = ({ taskId }) => {
  const handleClickEdit = (taskId: string) => {
    console.log("====================================");
    console.log("Edit Button Clicked", taskId);
    console.log("====================================");
  };

  const handleClickCheck = (taskId: string) => {
    console.log("====================================");
    console.log("Check Button Clicked", taskId);
    console.log("====================================");
  };

  const handleClickDelete = (taskId: string) => {
    console.log("====================================");
    console.log("Delete Button Clicked", taskId);
    console.log("====================================");
  };

  return (
    <ToolBar>
      <ToolButton>
        <FontAwesomeIcon icon={faPen} onClick={() => handleClickEdit(taskId)} />
      </ToolButton>
      <ToolButton>
        <FontAwesomeIcon
          icon={faCheck}
          onClick={() => handleClickCheck(taskId)}
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

export default TaskBar;
