import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header>
          <h1>Exercise Tracker</h1>
          <p>Full Stack MERN App Demonstration</p>
        </header>
        <Navigation />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
            <Route path="/add-exercise" element={<CreateExercisePage />} />
            <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
          </Routes>
        </div>
        <footer>
          <p>© 2024 Lujia He</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;