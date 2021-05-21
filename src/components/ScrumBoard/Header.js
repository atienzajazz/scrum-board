import React from "react";
import styled from "styled-components";
import { useBoardContext } from "../context/BoardContext";
import { useFormModalContext } from "../context/FormModalContext";

const StyledHeader = styled.header`
  color: #33272a;
  padding: 0.5em;
  display: flex;
  gap: 1em;
  box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.25);
`;

export const StyledButton = styled.button`
  padding: 0.4em;
  background: #ff8ba7;
  color: #33272a;
  border-radius: 0.5em;
  border: none;
  &:hover {
    cursor: pointer;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

function Header() {
  const { handleModal } = useFormModalContext();
  const {
    actions: { searchTasks },
    dispatch,
  } = useBoardContext();

  const handleOnChange = (e) => {
    const searchInput = e.target.value;
    searchTasks(searchInput.toLowerCase())(dispatch);
  };

  return (
    <StyledHeader>
      <input
        type="text"
        placeholder="Search Story"
        id="search-input"
        onChange={handleOnChange}
      />
      <StyledButton onClick={() => handleModal()}>Add Story</StyledButton>
    </StyledHeader>
  );
}

export default Header;
