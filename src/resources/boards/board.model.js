const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'ButterBoard',
    columns = new Column()
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

class Column {
  constructor({ id = uuid(), title = 'ColumnTitle', order = 'Order' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
