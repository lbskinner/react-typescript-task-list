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

  &:disabled {
    cursor: not-allowed;
    color: lightgray;
  }
`;

type TaskBarProps = {
  columnId: string;
  taskId: string;
  complete: boolean;
  handleClickEditTask: (taskId: string) => void;
  handleClickDeleteTask: (taskId: string, columnId: string) => void;
};

const TaskBar: React.FC<TaskBarProps> = ({
  columnId,
  taskId,
  complete,
  handleClickEditTask,
  handleClickDeleteTask,
}) => {
  return (
    <ToolBar>
      <ToolButton disabled={complete}>
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => handleClickEditTask(taskId)}
          // add pointer event none to disable click event
          style={complete ? { pointerEvents: "none" } : {}}
        />
      </ToolButton>
      <ToolButton>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleClickDeleteTask(taskId, columnId)}
        />
      </ToolButton>
    </ToolBar>
  );
};

export default TaskBar;
