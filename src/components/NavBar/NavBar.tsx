import React from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #4a4584;
  margin: 0;
  padding: 6px 18px;
`;

const Title = styled.h2`
  margin: 0;
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
