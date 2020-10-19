const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { catchErrors } = require('../../common/errorHandler');

// router.route('/').get(async (req, res) => {
//   const boards = await boardsService.getAll();
//   res.json(boards);
// });
router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

// router.route('/').post(async (req, res) => {
//   const board = await boardsService.create(new Board(req.body));
//   res.json(board);
// });
router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.status(200).json(board);
  })
);

// router.route('/:id').get(async (req, res) => {
//   try {
//     const user = await boardsService.getByID(req.params.id);
//     res.json(user);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getByID(req.params.id);
    if (board) {
      res.json(board);
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

// router.route('/:id').put(async (req, res) => {
//   try {
//     const board = await boardsService.update(req.params.id, req.body);
//     res.json(board);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    if (board) {
      res.status(200).json(board);
    } else {
      const error = new Error();
      error.status = 401;
      throw error;
    }
  })
);

// router.route('/:id').delete(async (req, res) => {
//   try {
//     const board = await boardsService.remove(req.params.id);
//     res.json(board);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await boardsService.remove(req.params.id)) {
      const board = await boardsService.remove(req.params.id);
      res.status(204).json(board);
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

module.exports = router;
