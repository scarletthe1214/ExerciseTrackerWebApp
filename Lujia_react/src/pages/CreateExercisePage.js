import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableRecord from '../components/TableRecord';

export const CreateExercisePage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');


    const createExercise = async () => {
        const newExercise = { name, reps: Number(reps), weight: Number(weight), unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h2 id="add-header">
                Enter values for the exercise
            </h2>
            <TableRecord
                name={name}
                setName={setName}
                reps={reps}
                setReps={setReps}
                weight={weight}
                setWeight={setWeight}
                unit={unit}
                setUnit={setUnit}
                date={date}
                setDate={setDate}
            />
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;