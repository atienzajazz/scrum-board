import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useBoardContext } from '../context/BoardContext';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    .invalid{
        color: red;
        font-size: .8em;
    }
    input, select {
        padding: .5em;
    }
`;

const Legend = styled.legend`
    font-size: 1.17em;
    font-weight: bold;
`;

const Fieldset = styled.fieldset`
    padding: 0.5em;
    border-radius: 1em;
`;


// form validation rules 
const validationSchema = Yup.object().shape({
    content: Yup.string()
        .max(72, 'Task can only be 60 characters max.')
        .required('Task is required'),
    points: Yup.number()
        .min(0, 'Only positive numbers.')
});

const formOptions = { resolver: yupResolver(validationSchema) };


function Form(props) {
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const {
        actions: { addTask, updateTask },
        state,
        dispatch
    } = useBoardContext();

    // Task data pulled from Props and Context State
    const { tasks, columns } = state;
    const { taskId, columnId, handleModal } = props;

    // Used when Editing a task.
    const content = taskId ? tasks[taskId].content : '';
    const points = taskId ? tasks[taskId].points : '';


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

    return (
        <Fieldset>
            <Legend>{!taskId ? 'Add Story' : 'Edit Story'}</Legend>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="content">Task:</label>
                <input
                    defaultValue={content}
                    id="content"
                    {...register("content")} />
                <div className="invalid">{errors.content?.message}</div>

                <label htmlFor="status">Status:</label>
                <select {...register("column")} defaultValue={columnId}>
                    {Object.values(columns).map((column) => (
                        <option value={column.id} key={column.id}>{column.title}</option>
                    ))}
                </select>

                <label htmlFor="points">Points:</label>
                <input {...register("points")} defaultValue={points ? points : 0} />
                <div className="invalid">{errors.points?.message}</div>

                <input type="submit" id="submitButton" />
            </FormContainer>
        </Fieldset>
    );
}

export default Form;