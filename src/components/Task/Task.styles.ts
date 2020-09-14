import styled from "styled-components";

type TaskStyleProps = {
  isDragging: boolean;
  isDragDisabled?: boolean;
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
`;

export const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
