import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _validation = [];

function setValidation(validation) {
  _validation = validation;
}


class StoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

    getValidation() {
      return _validation ;
    }

}

const Store = new StoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
Store.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case AppConstants.VALIDATE_XML:
      setValidation(action.validation);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      Store.emitChange();
      break;

    default:
  }
});

export default Store;
