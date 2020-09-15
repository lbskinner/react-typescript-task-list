import React from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #4a4584;
  margin: 0;
  padding: 6px 18px 3px 18px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0 15px 0 0;
  color: #f1f2f6;
`;

type NavBarProps = {
  handleAddColumn: (param?: any) => void;
};

const NavBar: React.FC<NavBarProps> = ({ handleAddColumn }) => {
  return (
    <Container>
      <Title>Task App</Title>

      <Dropdown handleAddColumn={handleAddColumn} />
    </Container>
  );
};

export default NavBar;
