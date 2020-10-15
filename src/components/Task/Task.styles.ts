import styled from "styled-components";

type TaskStyleProps = {
  isDragging: boolean;
  isDragDisabled?: boolean;
};

type TaskTextProps = {
  complete: boolean;
};
export const Container = styled.div<TaskStyleProps>`
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "#aeb8fe"
      : "white"};

  display: flex;
  position: relative;
`;

export const ToolButton = styled.button`
  background: #fff;
  cursor: pointer;
  font-size: 0.8em;
  padding: 2px 4px 2px 0;
  border: 0;

  &:hover {
    color: #758bfd;
  }
`;

export const TaskText = styled.span<TaskTextProps>`
  text-decoration: ${(props) => props.complete && "line-through"};
`;

export const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
