import React, { useState } from "react";
import styled from "styled-components";

type DropdownProps = {
  title: string;
  items: string[];
  multiSelect: boolean;
};

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
`;

const Dropdown = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <Button type="button">☰</Button>
    </Container>
  );
};

export default Dropdown;
