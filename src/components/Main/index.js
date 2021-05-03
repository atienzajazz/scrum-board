import React, { useState } from 'react';
import styled from 'styled-components';
import { useBoardContext } from '../context/BoardContext'
import Board from '../Board'
import Modal from './Modal'
import Form from './Form'

const HeroPage = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    width: 100vw;
    gap: 10px; 
`;

const Header = styled.header`
    border: 1px solid gray;
    color: white;
    background: #4A4A4A;
`;

const Content = styled.main`
    border: 1px solid gray;
    display: flex;
    justify-content: center;
`;

const Footer = styled.footer`
    border: 1px solid orange;
    color: white;
`;



function ScrumBoard() {
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
        <HeroPage>
            <Header>
                <input type="text" placeholder="Search Story" onChange={handleOnChange} />
                <button onClick={handleModal} >Add Story</button>
            </Header>
            <Content>
                <Board />
            </Content>
            <Footer>Footer</Footer>
            {visible && modal()}
        </HeroPage>
    );
}

export default ScrumBoard;