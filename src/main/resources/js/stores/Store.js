import Events from 'events';

let EventEmitter = Events.EventEmitter;

class Store extends EventEmitter {
    constructor(change) {
        super();
        this.change = change;
    }

    emitChange() {
        this.emit(this.change);
    }

    addChangeListener(callback) {
        this.on(this.change, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(this.change, callback);
    }
}

export default Store;