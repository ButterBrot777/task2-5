const DB = require('../../common/DB');

const getAll = async () => DB.getAllBoards();

const getByID = async id => {
  const board = await DB.getBoardByID(id);
  if (!board) {
    throw new Error(`Board with id ${id} was not found`);
  }
  return board;
};

const create = async board => DB.createBoard(board);

const update = async (id, body) => {
  const dbBoards = await DB.getBoardByID(id);
  if (!dbBoards) {
    throw new Error(`Board with id ${id} was not found`);
  }

  await DB.updateBoard(dbBoards, body);
  const updatedBoard = await getByID(id);
  return updatedBoard;
};

const remove = async id => {
  const dbBoards = await DB.getBoardByID(id);
  if (!dbBoards) {
    throw new Error(`Board with id ${id} was not found`);
  }

  const boardToRemove = Object.assign({}, dbBoards);
  await DB.removeBoard(dbBoards);
  return boardToRemove;
};

module.exports = { getAll, getByID, create, update, remove };
