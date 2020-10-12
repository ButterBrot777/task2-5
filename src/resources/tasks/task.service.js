const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getByID = id => tasksRepo.getByID(id);

const create = task => tasksRepo.create(task);

const update = (id, body) => tasksRepo.update(id, body);

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, getByID, create, update, remove };
