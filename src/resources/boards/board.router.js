const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board(req.body));
  res.json(board);
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await boardsService.getByID(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(board);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const board = await boardsService.remove(req.params.id);
    res.json(board);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
