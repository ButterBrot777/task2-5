const DB = require('../../common/DB');

const getAll = async () => DB.getAllUsers();

const getByID = async (id) => {
  const user = await DB.getUserByID(id);
  if (!user) {
    throw new Error(`User with id ${id} was not found`);
  }
  return user;
};

const create = async (user) => DB.createUser(user);

const update = async (id, body) => {
  const userFromDB = await DB.getUserByID(id);
  if (!userFromDB) {
    throw new Error(`User with id ${id} was not found`);
  }

  await DB.updateUser(userFromDB, body);

  const updatedUser = await DB.getUserByID(id);
  return updatedUser;
};

const remove = async (id) => {
  const user = await DB.getUserByID(id);

  if (!user) {
    throw new Error(`User with id ${id} was not found`);
  }

  const userToRemove = JSON.parse(JSON.stringify(user));
  await DB.removeUser(userToRemove);
  return userToRemove;
};

module.exports = { getAll, getByID, create, update, remove };
