import React from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: skyblue;
  margin: 0;
  padding: 6px 18px;
`;

const Title = styled.h2`
  margin: 0;
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
