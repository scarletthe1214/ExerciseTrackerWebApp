import React from 'react';

function TableRecord({ name, reps, weight, unit, date, setName, setReps, setWeight, setUnit, setDate }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input
                            name="name"
                            type="text"
                            autoComplete="on"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </td>
                    <td>
                        <input
                            name="reps"
                            type="number"
                            autoComplete="on"
                            value={reps}
                            onChange={e => setReps(e.target.value)} />
                    </td>
                    <td>
                        <input
                            name="weight"
                            type="number"
                            autoComplete="on"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} />
                    </td>
                    <td>
                        <select
                            name="unit"
                            value={unit}
                            onChange={e => setUnit(e.target.value)}
                        >
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                        </select>
                    </td>
                    <td>
                        <input
                            name="date"
                            type="text"
                            autoComplete="on"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableRecord;