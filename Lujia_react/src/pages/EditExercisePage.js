import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableRecord from '../components/TableRecord';

export const EditExercisePage = ({ exerciseToEdit }) => {
    const navigate = useNavigate();

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);


    const editExercise = async () => {
        const editedExercise = { name, reps: Number(reps), weight: Number(weight), unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h2 id="edit-header">
                Edit values for the exercise
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
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;