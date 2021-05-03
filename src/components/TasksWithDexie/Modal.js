import React from 'react';
import styled, { keyframes } from 'styled-components';

const animateTop = keyframes`
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
`;

const Container = styled.div`
  display: ${({ visible }) => visible ? 'block' : 'none'}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 5vh;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: ${animateTop};
  animation-duration: 0.4s;
`;


const ModalHeader = styled.header`
  padding: 2px 16px;
  background-color: #6DF48B;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ModalBody = styled.div`
  padding: 1em 16px;
`;

const ModalFooter = styled.footer`
  padding: 2px 16px;
  background-color: #6DF48B;
  color: white;
  height: 1em;
`

const CloseButton = styled.span`
  color: black;
  font-size: 28px;
  font-weight: bold;
  display: inline;
  &:hover{
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  &:focus{
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;


const Modal = (props) => {
  const { children, visible, handleClose } = props;

  return (
    <Container visible={visible}>
      <ModalContent>
        <ModalHeader>
          <CloseButton onClick={() => handleClose()}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Container>
  )
}

export default Modal;