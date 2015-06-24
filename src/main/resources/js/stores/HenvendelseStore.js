import AppDispatcher from './../AppDispatcher.js';
import Store from './Store.js';
import Constants from './../Constants.js';

let _henvendelser = {};
let _valgtHenvendelse = null;

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

    getValgtHenvendelse() {
        return _valgtHenvendelse;
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

    let forsteHenvendelse = _HenvendelseStore.getSisteNEndret(1)[0] || {};

    _valgtHenvendelse = forsteHenvendelse.behandlingsId || null;
    _HenvendelseStore.emitChange();
};

ActionHandlers[Constants.VALGT_HENVENDELSE] = (action) => {
    _valgtHenvendelse = action.data;
    _HenvendelseStore.emitChange();
};


AppDispatcher.register(function (action) {
    var callback = ActionHandlers[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _HenvendelseStore;