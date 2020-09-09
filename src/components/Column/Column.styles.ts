import styled from "styled-components";

type ColumnStyleProps = {
  isDraggingOver: boolean;
};

export const Container = styled.div`
  margin: 8px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  // add flex and flex column to display items within columns
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h3`
  padding: 8px;
  font-weight: bold;
  font-size: 1.17em;
`;
export const TaskList = styled.div<ColumnStyleProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  flex-grow: 1;
  // have a min-height so the droppable area's height is not 0 when there are no items
  min-height: 100px;
`;
