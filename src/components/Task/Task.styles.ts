import styled from "styled-components";

type TaskStyleProps = {
  isDragging: boolean;
};

type TaskTextProps = {
  complete: boolean;
};

type CheckButtonProps = {
  checkDisabled: boolean;
};
export const Container = styled.div<TaskStyleProps>`
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#aeb8fe" : "white")};

  display: flex;
  position: relative;
`;

export const ToolButton = styled.button<CheckButtonProps>`
  background: inherit;
  cursor: pointer;
  font-size: 0.8em;
  padding: 2px 4px 2px 0;
  border: 0;
  pointer-events: ${(props) => (props.checkDisabled ? "none" : "inherit")};
  opacity: ${(props) => (props.checkDisabled ? "0" : "1")};

  &:hover {
    color: #758bfd;
  }
`;

export const TaskText = styled.span<TaskTextProps>`
  text-decoration: ${(props) => props.complete && "line-through"};
`;

export const TaskInput = styled.input`
  border-radius: 2px;
  border-style: none;
  // border-bottom-width: thin;
  font-family: inherit;
  font-size: 1em;
  padding: 0;
  width: 80%;

  &:focus {
    // outline: #758bfd solid 0.5px;
    outline: none;
  }
`;
