import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { useBoardContext } from '../context/BoardContext';
import Modal from '../Main/Modal'
import Form from '../Main/Form'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.isDragging ? '#f3d2c1' : 'white'};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;

const TaskContent = styled.p`

`;

const TaskPoints = styled.p`
 font-size: 0.6em;
 width: 1rem;
 font-weight: bold;
 padding-left: .5em;
 padding-right: .5em; 
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: .2em;  
`

const Task = ({ task, index, columnId }) => {
  const [visible, setVisible] = useState(false);
  const {
    actions: { deleteTask },
    dispatch
  } = useBoardContext();

  const handleTaskDeletion = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId, columnId)(dispatch);
    }
  }

  const handleModal = () => {
    setVisible(!visible);
  }

  const modal = () => {
    return (
      <Modal visible={visible} handleClose={handleModal} >
        <Form handleModal={handleModal} columnId={columnId} taskId={task.id} />
      </Modal>
    );
  }

  return (
    <>
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >

            <Left>
              <TaskContent>{task.content}</TaskContent>
              <TaskPoints>{task.points} </TaskPoints>
            </Left>
            <Right>
              <button onClick={() => handleModal()}>Edit</button>
              <button onClick={() => handleTaskDeletion(task.id)}>Delete</button>
            </Right>
          </Container>
        )}
      </Draggable>
      {visible && modal(task.id)}
    </>
  );
}

export default Task;