const uuidv4 = require('uuid/v4');

const statuses = require('./commandStatuses');

module.exports = class Command {

  constructor (data) {
    this.__uuid = uuidv4();
    this.__data = data;
    this.__status = statuses.STATUS_IN_QUEUE;
    this.__result = undefined;
  }

  get uuid () {
    return this.__uuid;
  }

  get data () {
    return this.__data;
  }

  get status () {
    return this.__status;
  }

  set status (value) {
    if (!Command.getAllowedStatuses().includes(value)) {
      throw new Error('Unknown status "' + value + '"');
    }
    this.__status = value;
  }

  get result () {
    return this.__result;
  }

  set result (result) {
    this.__result = result;
  }

  render () {
    return {
      uuid: this.__uuid,
      data: this.__data,
      status: this.__status,
      result: this.__result,
    };
  }

}
