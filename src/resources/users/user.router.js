const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User(req.body));
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getByID(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deleted = await usersService.remove(req.params.id);
    res.json(User.toResponse(deleted));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
