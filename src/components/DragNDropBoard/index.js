import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './column';
import { useBoardContext } from '../context/BoardContext'


const Container = styled.div`
    display: flex;
`;

const Scrum = () => {
    const {
        actions: { reorderTaskAndColumns },
        state,
        dispatch
    } = useBoardContext();
    const { tasks, columns, columnOrder } = state;


    const onDragEnd = (result) => {
        reorderTaskAndColumns(result, state)(dispatch)
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Container>
                {columnOrder &&
                    columnOrder.map(columnId => {
                        const column = columns[columnId];
                        const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={columnTasks} />;
                    })
                }
            </Container>
        </DragDropContext>

    );
}


export default Scrum;