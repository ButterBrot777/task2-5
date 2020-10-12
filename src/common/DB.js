const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');


const DB = {
  users: [],
  boards: [],
  tasks: []
};

DB.users.push(new User(), new User(), new User());
const customeBoard = new Board();
DB.boards.push(customeBoard);
DB.tasks.push(
	new Task({boardId: customeBoard.id}),
	new Task({boardId: customeBoard.id}),
	new Task({boardId: customeBoard.id}),
)

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
	removeUserTasks(user.id);
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
	removerBoardTasks(board.id);
};

// actions for tasks

// tasks

const getAllTasks = async () => DB.tasks.slice(0);

const getTaskByID = async id => DB.tasks.filter(task => task.id === id)[0];

const createTask = async task => {
  DB.tasks.push(task);
  return await getTaskByID(task.id);
};

const updateTask = async (dbTask, body) => {
  const taskIndex = DB.tasks.findIndex(task => task.id === dbTask.id);

  DB.tasks[taskIndex].title = body.title;
  DB.tasks[taskIndex].order = body.order;
  DB.tasks[taskIndex].description = body.description;
  DB.tasks[taskIndex].userId = body.userId;
  DB.tasks[taskIndex].boardId = body.boardId;
  DB.tasks[taskIndex].columnId = body.columnId;

  return DB.tasks[taskIndex];
};

const removeTask = async task => {
  const taskIndex = DB.tasks.findIndex(taskElem => taskElem.id === task.id);
  const lastTask = DB.tasks.pop();
  if (DB.tasks.length > 0 && lastTask !== task) {
    DB.tasks[taskIndex] = lastTask;
  }
};

function removeUserTasks(userId) {
  DB.tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
};

function removerBoardTasks(boardId) {
  const newTasks = DB.tasks.filter(task => task.boardId !== boardId);
  DB.tasks = newTasks;
}

module.exports = { 
	getAllUsers, getUserByID, createUser, updateUser, removeUser,
	getAllBoards, getBoardByID, createBoard, updateBoard, removeBoard,
};
