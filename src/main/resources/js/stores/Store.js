import AppDispatcher from './../AppDispatcher.js';
import Events from 'events';
import Constants from './../Constants.js';

let EventEmitter = Events.EventEmitter;

let _value = -1;
const change = 'counterchange';

class CounterStore extends EventEmitter {
    getValue() {
        return _value
    }

    emitChange() {
        this.emit(change);
    }

    addChangeListener(callback) {
        this.on(change, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(change, callback);
    }
}

let _CounterStore = new CounterStore();

const ActionCallbacks = {};
ActionCallbacks[Constants.SET_VALUE] = function (action) {
    _value = action.data;
    _CounterStore.emitChange();
};

AppDispatcher.register(function (action) {
    var callback = ActionCallbacks[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _CounterStore;