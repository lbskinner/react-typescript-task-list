import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../store/mapStoreToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: incline-block;
`;

const Button = styled.button`
  padding: 0;
  border: 0;
  background-color: #4a4584;
  cursor: pointer;
  font-size: 1.5em;
  outline: 0;
  color: #f1f2f6;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  width: 100px;
  z-index: 2;
  // border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  background-color: white;
  border-radius: 3px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 8px 12px;
  background-position: center;
  transition: background 0.8s;
  font-size: 0.8em;
  font-weight: bold;
  border-radius: 3px;
  color: #4a4584;

  &:hover {
    cursor: pointer;
    color: #758bfd;
    // below are for clicking effect, did not use
    // background-color: rgba(0, 0, 0, 0.1);
    // background: #758bfd radial-gradient(circle, transparent 1%, #758bfd 1%)
    //   center/15000%;
  }
  // &:active {
  //   background-color: #f1f2f6;
  //   background-size: 100%;
  // transition: background 0s;
  }
`;
// type NavBarProps = {
//   handleAddColumn: (param?: any) => void;
// };

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

const Dropdown: React.FC<PropsFromRedux> = ({ updateTaskData, allTasks }) => {
  const container = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      container.current &&
      !container.current.contains(event.target as Element)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddColumn = () => {
    setOpen(false);
    const newColumnId = `column-${allTasks.columnOrder.length + 1}`;
    const newState = {
      ...allTasks,
      columns: {
        ...allTasks.columns,
        [newColumnId]: {
          id: newColumnId,
          title: "New Column",
          taskIds: [],
        },
      },
      columnOrder: [...allTasks.columnOrder, newColumnId],
    };
    updateTaskData(newState);
  };

  return (
    <Container ref={container}>
      <Button type="button" onClick={toggleMenu}>
        ☰
      </Button>
      {open && (
        <DropdownMenu>
          <List>
            <ListItem onClick={handleAddColumn}>Add Column</ListItem>
          </List>
        </DropdownMenu>
      )}
    </Container>
  );
};

export default connect(mapStoreToProps, mapDispatchToProps)(Dropdown);
