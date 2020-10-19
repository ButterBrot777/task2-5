const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');
const { catchErrors } = require('../../common/errorHandler');

// router.route('/').get(async (req, res) => {
//   const tasks = await tasksService.getAll();
//   res.json(tasks);
// });
router.route('/:boardId/tasks').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    await res.status(200).json(tasks);
  })
);

// router.route('/').post(async (req, res) => {
//   const task = await tasksService.create(new Task(req.body));
//   res.json(task);
// });
router.route('/:boardId/tasks').post(
  catchErrors(async (req, res) => {
    const task = await tasksService.create(new Task(req.body));
    res.json(task);
  })
);

// router.route('/:id').get(async (req, res) => {
//   try {
//     const user = await tasksService.getByID(req.params.id);
//     res.json(user);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await tasksService.getByID(req.params.id);
    if (task) {
      await res.status(200).json();
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

// router.route('/:id').put(async (req, res) => {
//   try {
//     const task = await tasksService.update(req.params.id, req.body);
//     res.json(task);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
router.route('/:id').put(
  catchErrors(async (req, res) => {
    const task = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) {
      await res.json(Task.toResponse(task));
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

// router.route('/:id').delete(async (req, res) => {
//   try {
//     const task = await tasksService.remove(req.params.id);
//     res.json(task);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await tasksService.remove(req.params.id)) {
      const task = await tasksService.remove(req.params.id);
      res.status(204).json(task);
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

module.exports = router;
