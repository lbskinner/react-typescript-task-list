import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ToolBar = styled.div`
  border: 1px solid gray;
  border-radius: 3px;
`;

const ToolButton = styled.button`
  background: none;
  cursor: pointer;
  font-size: 0.7em;
  outline: 0;
  padding: 2px 4px;
  border: 0;

  &:hover {
    color: #758bfd;
  }
`;

const TaskBar = () => {
  return (
    <ToolBar>
      <ToolButton>
        <FontAwesomeIcon icon={faPen} />
      </ToolButton>
      <ToolButton>
        <FontAwesomeIcon icon={faCheck} />
      </ToolButton>
      <ToolButton>
        <FontAwesomeIcon icon={faTrash} />
      </ToolButton>
    </ToolBar>
  );
};

export default TaskBar;
