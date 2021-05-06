import React, { useState } from 'react';
import styled from 'styled-components';
import { useBoardContext } from '../context/BoardContext'
import Form from './Form'
import Modal from './Modal'

const StyledHeader = styled.header`
    color: #33272a;
    padding: .5em;
    display: flex;
    gap: 1em;
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.25);
`;

export const StyledButton = styled.button`
    padding: .4em;
    background: #ff8ba7;
    color: #33272a;
    border-radius: .5em;
    border: none;
    &:hover{
        cursor: pointer;
        box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
    }
`;

function Header() {
    const [visible, setVisible] = useState(false);
    const {
        actions: { searchTasks },
        dispatch
    } = useBoardContext();

    const handleModal = () => {
        setVisible(!visible);
    }

    const handleOnChange = (e) => {
        const searchInput = e.target.value;
        searchTasks(searchInput.toLowerCase())(dispatch)
    }

    const modal = () => {
        return (
            <Modal visible={visible} handleClose={handleModal} >
                <Form handleModal={handleModal} />
            </Modal>
        );
    }

    return (
        <StyledHeader>
            <input type="text" placeholder="Search Story" onChange={handleOnChange} />
            <StyledButton onClick={handleModal}>Add Story</StyledButton>
            {visible && modal()}
        </StyledHeader>);
}

export default Header;