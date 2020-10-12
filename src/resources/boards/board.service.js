const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getByID = (id) => boardsRepo.getByID(id);

const create = (board) => boardsRepo.create(board);

const update = (id, body) => boardsRepo.update(id, body);

const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, getByID, create, update, remove };
