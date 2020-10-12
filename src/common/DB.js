const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');


const DB = {
  users: [],
  boards: [],
  tasks: []
};

DB.users.push(new User(), new User(), new User());
DB.boards.push(new Board());

// actions for users

const getAllUsers = async () => DB.users.slice(0);
const getUserByID = async id => DB.users.filter(user => user.id === id)[0];

const createUser = async user => {
  DB.users.push(user);
  return getUserByID(user.id);
};

const updateUser = async (dbUser, body) => {
  const userIndex = DB.users.findIndex(user => user.id === dbUser.id);

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

// action for boards

const getAllBoards = async () => DB.boards.slice(0);

const getBoardByID = async (id) => DB.boards.filter(board => board.id === id)[0];

const createBoard = async (board) => {
  DB.boards.push(board);
  return getBoardByID(board.id);
};

const updateBoard = async (dbBoard, body) => {
  const boardIndex = DB.boards.findIndex(board => board.id === dbBoard.id);

  DB.boards[boardIndex].title = body.title;
  DB.boards[boardIndex].columns = body.columns;

  return DB.boards[boardIndex];
};

const removeBoard = async board => {
  const boardIndex = DB.boards.findIndex(boardElem => boardElem.id === board.id);
  const lastBoard = DB.boards.pop();
  if (DB.boards.length > 0 && lastBoard !== board) {
    DB.boards[boardIndex] = lastBoard;
  }
};

module.exports = { 
	getAllUsers, getUserByID, createUser, updateUser, removeUser,
	getAllBoards, getBoardByID, createBoard, updateBoard, removeBoard,
};
