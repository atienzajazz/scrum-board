import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useBoardContext } from '../context/BoardContext';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Legend = styled.legend`
    font-size: 1.17em;
    font-weight: bold;
`;

const Fieldset = styled.fieldset`
    padding: 0.5em;
    border-radius: 1em;
`;


function Form(props) {
    const { register, handleSubmit } = useForm();
    const {
        actions: { addTask, updateTask },
        state,
        dispatch
    } = useBoardContext();

    // Task data pulled from Props and Context State
    const { tasks, columns } = state;
    const { taskId, columnId, handleModal } = props;

    const onSubmit = async (data) => {
        if (!taskId) {
            addTask(data)(dispatch);
            handleModal();
        } else {
            updateTask(taskId, columnId, data)(dispatch);
            if (columnId === data.column) {
                handleModal();
            }
        }
    };

    // Used when Editing a task.
    const content = taskId ? tasks[taskId].content : '';
    const points = taskId ? tasks[taskId].points : '';

    return (
        <Fieldset>
            <Legend>{!taskId ? 'Add Story' : 'Edit Story'}</Legend>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="content">Task Name:</label>
                <input {...register("content", { required: true, maxLength: 20 })} defaultValue={content} id="content" />

                <label htmlFor="status">Status:</label>
                <select {...register("column")} defaultValue={columnId}>
                    {Object.values(columns).map((column) => (
                        <option value={column.id} key={column.id}>{column.title}</option>
                    ))}
                </select>

                <label htmlFor="points">Points:</label>
                <input {...register("points", { min: 0, max: 32 })} defaultValue={points} />

                <input type="submit" id="submitButton" />
            </FormContainer>
        </Fieldset>
    );
}

export default Form;