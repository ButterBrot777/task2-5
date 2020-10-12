const DB = require('../../common/DB');

const getAll = async () => DB.getAllTasks();

const getByID = async (id) => {
  const task = await DB.getTaskByID(id);
  if (!task) {
    throw new Error(`Task with id ${id} was not found`);
  }
  return task;
};

const create = async (task) => DB.createTask(task);

const update = async (id, body) => {
  const dbTask = await DB.getTaskByID(id);
  if (!dbTask) {
    throw new Error(`Task with id ${id} was not found`);
  }

  await DB.updateTask(dbTask, body);
  const updatedUser = await getByID(id);
  return updatedUser;
};

const remove = async (id) => {
  const dbTask = await DB.getTaskByID(id);
  if (!dbTask) {
    throw new Error(`Task with id ${id} was not found`);
  }

  const taskToRemove = JSON.parse(JSON.stringify(user));
  await DB.removeTask(taskToRemove);
  return taskToRemove;
};

module.exports = { getAll, getByID, create, update, remove };
