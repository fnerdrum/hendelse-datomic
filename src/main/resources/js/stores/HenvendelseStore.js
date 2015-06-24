import AppDispatcher from './../AppDispatcher.js';
import Store from './Store.js';
import Constants from './../Constants.js';

let _henvendelser = {};

class HenvendelseStore extends Store {
    constructor() {
        super('henvendelsechange');
    }

    getAll() {
        return Object.keys(_henvendelser).map(id => _henvendelser[id]);
    }

    getSisteNEndret(n) {
        return this.getAll().sort((a, b) => {
            return b.lastUpdate.epochSecond - a.lastUpdate.epochSecond;
        }).slice(0, n);
    }
}

let _HenvendelseStore = new HenvendelseStore();


const ActionHandlers = {};
ActionHandlers[Constants.UPSERT_HENVENDELSE] = (action) => {
    let henvendelse = action.data;

    _henvendelser[henvendelse.behandlingsId] = henvendelse;
    _HenvendelseStore.emitChange();
};

ActionHandlers[Constants.HENTING_FEILET] = (action) => {
    console.error('Henting av alle henvendelser feilet...');
};

ActionHandlers[Constants.HENTING_OK] = (action) => {
    _henvendelser = action.data.reduce((acc, henvendelse) => {
        acc[henvendelse.behandlingsId] = henvendelse;
        return acc;
    }, {});
    _HenvendelseStore.emitChange();
};

AppDispatcher.register(function (action) {
    var callback = ActionHandlers[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _HenvendelseStore;