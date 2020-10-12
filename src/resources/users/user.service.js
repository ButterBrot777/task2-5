const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getByID = (id) => usersRepo.getByID(id);

const create = (user) => usersRepo.create(user);

const update = (id, body) => usersRepo.update(id, body);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, getByID, create, update, remove };
