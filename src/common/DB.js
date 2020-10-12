const User = require('../resources/users/user.model');

const DB = {
  users: [],
  boards: [],
  tasks: []
};

DB.users.push(new User(), new User(), new User());

// actions for users

const getAllUsers = async () => DB.users.slice(0);
const getUserByID = async id => DB.users.filter(user => user.id === id)[0];

const createUser = async user => {
  DB.users.push(user);
  return getUserByID(user.id);
};

const updateUser = async (userFromDB, body) => {
  const userIndex = DB.users.findIndex(user => user.id === userFromDB.id);

  DB.users[userIndex].name = body.name;
  DB.users[userIndex].login = body.login;
  DB.users[userIndex].password = body.password;

  return DB.users[userIndex];
};

const removeUser = async user => {
  const userIndex = DB.users.findIndex(userUnit => userUnit.id === user.id);
  const lastUser = DB.users.pop();
  if (DB.users.length > 0 && lastUser !== user) {
    DB.users[userIndex] = lastUser;
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  removeUser
};
