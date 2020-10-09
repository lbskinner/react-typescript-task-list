import React, { useState } from "react";
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
    below are for clicking effect, did not use
    background-color: rgba(0, 0, 0, 0.1);
    background: #fff radial-gradient(circle, transparent 1%, #fff 1%)
      center/15000%;
  }
  &:active {
    background-color: #bdb2ff;
    background-size: 100%;
  transition: background 0s;
  }
`;

type PropsFromRedux = ReturnType<typeof mapStoreToProps> &
  typeof mapDispatchToProps;

const Dropdown: React.FC<PropsFromRedux> = ({ updateTaskData, allTasks }) => {
  const [open, setOpen] = useState<boolean>(false);

  // use toggle for open and close dropdown menu when click on menu button
  // changed approach to mouse hover
  // const toggleMenu = () => {
  //   setOpen(!open);
  // };

  // used useRef and useEffect for close dropdown menu
  // when click other areas of app
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     container.current &&
  //     !container.current.contains(event.target as Element)
  //   ) {
  //     setOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleAddColumn = () => {
    // setOpen(false);
    // store all current column ids in an array
    const currentColumnIds = Object.keys(allTasks.columns);
    // get the last column id
    const lastColumnId = currentColumnIds[currentColumnIds.length - 1];
    // get the number of the last column id
    const lastColumnIdNum = parseInt(
      lastColumnId.charAt(lastColumnId.length - 1)
    );
    // set the new column id number to the last column id number + 1
    // compared to the prior approach, which calculates the new column id
    // based on the number of columns current exists which can duplicate column id
    // e.x. delete one of the existing column and then add another column
    const newColumnId = `column-${lastColumnIdNum + 1}`;
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
    <Container>
      {/* <Container ref={container}> */}
      <Button
        type="button"
        // onClick={toggleMenu}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        ☰
      </Button>
      {open && (
        <DropdownMenu
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <List>
            <ListItem onClick={handleAddColumn}>Add Column</ListItem>
          </List>
        </DropdownMenu>
      )}
    </Container>
  );
};

export default connect(mapStoreToProps, mapDispatchToProps)(Dropdown);
