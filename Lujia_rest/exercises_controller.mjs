import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

function isDateValid(date) {
  // Test using a regular expression. 
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

function isValidRequest(req) {
  if (typeof (req.body.reps) !== "number" || typeof (req.body.weight) !== "number") {
    return false
  }
  if (req.body.reps <= 0 || req.body.weight <= 0) {
    return false
  }
  if (typeof (req.body.name) !== "string") {
    return false
  }
  if (req.body.name === undefined || req.body.name === null) {
    return false
  }
  if (req.body.unit !== "kgs" && req.body.unit !== "lbs") {
    return false
  }
  if (!isDateValid(req.body.date)) {
    return false
  }
  return true
}

/**
 * Create a new exercise
 */
app.post('/exercises', (req, res) => {
  if (!isValidRequest(req)) {
    res.status(400).json({ Error: 'Invalid request' });
    return
  }
  exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
      res.status(201).json(exercise);
    })
    .catch(error => {
      console.error(error);
      res.status(400).json({ Error: 'Request failed' });
    });
});

/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
  const exerciseId = req.params._id;
  exercises.findExerciseById(exerciseId)
    .then(exercise => {
      if (exercise !== null) {
        res.json(exercise);
      } else {
        res.status(404).json({ Error: 'Resource not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ Error: 'Request failed' });
    });
});

/**
 * Retrieve exercises. 
 * If the query parameters include a name, then only the exercise for that name are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
  exercises.findExercises({}, '', 0)
    .then(exercises => {
      res.send(exercises);
    })
    .catch(error => {
      console.error(error);
      res.send({ Error: 'Request failed' });
    });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * all the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
  if (!isValidRequest(req)) {
    res.status(400).json({ Error: 'Invalid request' });
    return
  }
  exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(numUpdated => {
      if (numUpdated === 1) {
        res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
      } else {
        res.status(404).json({ Error: 'Resource not found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(400).json({ Error: 'Request failed' });
    });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
  exercises.deleteById(req.params._id)
    .then(deletedCount => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: 'Resource not found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.send({ error: 'Request failed' });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});