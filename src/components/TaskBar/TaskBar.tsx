import React from "react";
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

type TaskBarProps = {
  taskId: string;
  complete: boolean;
  handleClickEditTask: (taskId: string) => void;
  handleClickDeleteTask: (taskId: string) => void;
};

const TaskBar: React.FC<TaskBarProps> = ({
  taskId,
  complete,
  handleClickEditTask,
  handleClickDeleteTask,
}) => {
  return (
    <ToolBar>
      <ToolButton style={complete ? { pointerEvents: "none" } : {}}>
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => handleClickEditTask(taskId)}
        />
      </ToolButton>
      <ToolButton>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleClickDeleteTask(taskId)}
        />
      </ToolButton>
    </ToolBar>
  );
};

export default TaskBar;
