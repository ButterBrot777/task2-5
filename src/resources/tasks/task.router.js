const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(new Task(req.body));
  res.json(task);
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await tasksService.getByID(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const task = await tasksService.remove(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
