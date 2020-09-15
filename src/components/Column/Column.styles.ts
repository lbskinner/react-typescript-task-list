import styled from "styled-components";

type ColumnStyleProps = {
  isDraggingOver: boolean;
};

export const Container = styled.div`
  margin: 8px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 6px;
  width: 220px;
  // add flex and flex column to display items within columns
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

export const TitleWrapper = styled.div`
  background-color: #758bfd;
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 10px 20px;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 5px;
  cursor: text;
  border-radius: 4px;
  color: #f1f2f6;
  text-align: center;
`;

export const TitleInput = styled.input`
  border-radius: 6px;
  border-style: none;
  font-family: inherit;
  font-size: 1.5em;
  padding: 5px;
  text-align: center;
  width: 80%;
`;

export const TaskList = styled.div<ColumnStyleProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#f1f2f6" : "inherit"};
  // flex-grow: 1;
  // have a min-height so the droppable area's height is not 0 when there are no items
  min-height: 100px;
`;

export const AddButton = styled.button`
  padding: 0;
  border: 0;
  background-color: white;
  cursor: pointer;
  font-size: 1em;
  margin: 10px auto;
  outline: 0;
  color: #758bfd;
  border-radius: 50%;
  height: 25px;
  width: 25px;

  &:hover {
    color: #fff;
    background-color: #758bfd;
  }
`;
