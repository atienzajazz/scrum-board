import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";
import db from '../db';
import columns from './initial-columns';
import Modal from './Modal'
import Form from './Form'


const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ItemContainer = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    display: flex;
    gap: 10px;
`;

const Item = styled.div`
    border-radius: 2px;
    padding: 8px;
    background-color: orange;
    &:hover{    
        cursor: ${(props) => props.primary ? 'pointer' : 'default'};
    }
`;


const Tasks = (props) => {
    const [visible, setVisible] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(undefined);
    const allTasks = useLiveQuery(() => db.tasks.toArray(), []);
    if (!allTasks) return null;

    const handleClick = (id) => {
        setCurrentTaskId(id);
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(!visible);
    }

    const removeTaskFromDb = async id => {
        await db.tasks.delete(id)
    }

    const updateStatus = async (id, event) => {
        await db.tasks.update(id, { status: event.target.value })
    }

    const modal = () => {
        return (
            <Modal visible={visible} handleClose={handleClose} >
                <Form id={currentTaskId} />
            </Modal>
        );
    }

    return (
        <div className="container">
            <h2>Animated Modal with Header and Footer</h2>
            <button id="myBtn" onClick={handleClick} >Add Story</button>
            <ListContainer>
                {allTasks.length > 0 && allTasks.map((taskData) => {
                    const { id, task, description, status, points, assignedTo } = taskData;
                    return (
                        <ItemContainer key={id} >
                            <Item onClick={() => handleClick(id)} primary>{task}</Item>
                            <Item>{description}</Item>
                            <select onChange={(event) => updateStatus(id, event)} defaultValue={status}>
                                {columns.map((column) => (
                                    <option value={column.id} key={column.id} >{column.title}</option>
                                ))}
                            </select>
                            <Item>{points}</Item>
                            <Item>{assignedTo}</Item>
                            <button onClick={() => removeTaskFromDb(id)}>Delete</button>
                        </ItemContainer>
                    )
                })}
            </ListContainer>
            {visible && modal()}
        </div>
    )
}

export default Tasks;