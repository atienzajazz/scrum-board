import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import db, { addTask, updateTask } from '../db';
import columns from './initial-columns';
import { useLiveQuery } from "dexie-react-hooks";

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

const initialData = {
    id: '',
    task: '',
    description: '',
    status: '',
    points: '',
    assignedTo: ''
}



function Form(props) {
    const { register, handleSubmit } = useForm();
    const [disabled, setDisabled] = useState(false);
    const allTasks = useLiveQuery(() => db.tasks.toArray(), []);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        if (!props.id) return;
        if (!allTasks) return;
        const filtered = allTasks.filter((task) => task.id === props.id);
        if (filtered.length > 0) {
            setData(filtered[0]);
        }
        return;
    }, [props.id, allTasks]);


    const { id, task, description, status, points, assignedTo } = data;

    const onSubmit = async (data) => {
        setDisabled(true);
        if (!id) {
            await addTask(data);
        } else {
            await updateTask(id, data);
        }

    };


    return (
        <Fieldset>
            <Legend>{!id ? 'Add Story' : 'Edit Story'}</Legend>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="task">Task Name:</label>
                <input {...register("task", { required: true, maxLength: 20 })} defaultValue={task} id="task" />
                <label htmlFor="status">Status:</label>
                <select {...register("status")} defaultValue={status}>
                    {columns.map((column) => (
                        <option value={column.id} key={column.id}>{column.title}</option>
                    ))}
                </select>
                <label htmlFor="description">Description:</label>
                <textarea {...register("description")} defaultValue={description} />
                <label htmlFor="points">Points:</label>
                <input {...register("points", { min: 0, max: 32 })} defaultValue={points} />
                <label htmlFor="assignedTo">Assigned To:</label>
                <input {...register("assignedTo", { maxLength: 20 })} defaultValue={assignedTo} />
                <input type="submit" id="submitButton" disabled={disabled} />
            </FormContainer>
        </Fieldset>
    );
}

export default Form;