import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: incline-block;
`;

const Button = styled.button`
  padding: 0;
  border: 0;
  background-color: skyblue;
  cursor: pointer;
  font-size: 1.5em;
  margin-right: 8px;
  outline: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100px;
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  background-color: white;
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    background: #7ac6e46e radial-gradient(circle, transparent 1%, #7ac6e46e 1%)
      center/15000%;
  }
  &:active {
    background-color: #a3d3e66e;
    background-size: 100%;
    transition: background 0s;
  }
`;
type NavBarProps = {
  handleAddColumn: (param?: any) => void;
};

const Dropdown: React.FC<NavBarProps> = ({ handleAddColumn }) => {
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

  return (
    <Container ref={container}>
      <Button type="button" onClick={toggleMenu}>
        ☰
      </Button>
      {open && (
        <DropdownMenu>
          <List>
            <ListItem onClick={handleAddColumn}>Add Column</ListItem>
            <ListItem>Option 2</ListItem>
            <ListItem>Option 3</ListItem>
          </List>
        </DropdownMenu>
      )}
    </Container>
  );
};

export default Dropdown;
