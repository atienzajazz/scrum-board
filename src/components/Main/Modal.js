import React from 'react';
import styled, { keyframes } from 'styled-components';

const animateTop = keyframes`
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
`;

const Container = styled.div`
  display: ${({ visible }) => visible ? 'block' : 'none'}; 
  position: fixed; 
  z-index: 1; 
  padding-top: 5vh;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgba(0,0,0,0.4); 
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 40%;
  animation-name: ${animateTop};
  animation-duration: 0.4s;
  border-radius: 1em 1em 1em 1em;
  @media  (max-width: 700px) {
    width: 80vw;
    margin-left: 0;
  }
`;


const ModalHeader = styled.header`
  position: inherit;
  padding: 2px 16px;
  background-color: #f3d2c1;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: .9em .9em 0 0;
  box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.25);
`;

const ModalBody = styled.div`
  position: relative;
  padding: 1em 16px;
  border-radius: 1em;
`;

const ModalFooter = styled.footer`
  position: relative;
  padding: 2px 16px;
  background-color: #f3d2c1;
  color: white;
  height: 1em;
  border-radius: 0 0 .9em .9em;
  box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.25);
`

const CloseButton = styled.span`
  color: white;
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
          <CloseButton onClick={handleClose}>&times;</CloseButton>
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