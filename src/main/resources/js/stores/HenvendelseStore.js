import AppDispatcher from './../AppDispatcher.js';
import Store from './Store.js';
import Constants from './../Constants.js';

let _henvendelser = {};
let _valgtHenvendelse = null;
let _valgtHendelseIndex = null;
let _visHenvendelseListe = false;

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

    getValgtHendelseIndex() {
        return _valgtHendelseIndex;
    }

    getVisHenvendelseListe() {
        return _visHenvendelseListe;
    }
}

let _HenvendelseStore = new HenvendelseStore();


const ActionHandlers = {};
ActionHandlers[Constants.UPSERT_HENVENDELSE] = (action) => {
    let henvendelse = action.data;

    _henvendelser[henvendelse.behandlingsId] = henvendelse;

    if (_valgtHenvendelse.behandlingsId === henvendelse.behandlingsId) {
        _valgtHenvendelse = henvendelse;
    }

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

    let forsteHenvendelse = _HenvendelseStore.getSisteNEndret(1)[0] || null;
    let hendelseListe = forsteHenvendelse ? forsteHenvendelse.hendelseList || [] : [];

    _valgtHenvendelse = forsteHenvendelse || null;
    _valgtHendelseIndex = hendelseListe.length === 0 ? 0 : hendelseListe.length-1;
    _HenvendelseStore.emitChange();
};

ActionHandlers[Constants.VALGT_HENVENDELSE] = (action) => {
    _valgtHenvendelse = action.data;
    _valgtHendelseIndex = action.data.hendelseList.length-1;
    _HenvendelseStore.emitChange();
};

ActionHandlers[Constants.VALGT_HENDELSE_INDEX] = (action) => {
    let index = action.data;
    if (index < 0 || index >= _valgtHenvendelse.hendelseList.length) {
        return;
    }

    _valgtHendelseIndex = index;
    _HenvendelseStore.emitChange();
};


ActionHandlers[Constants.NESTE_HENVENDELSE] = (action) => {
    let henvendelser = _HenvendelseStore.getSisteNEndret(10);
    let index = henvendelser.indexOf(_valgtHenvendelse);

    index++;

    if (index === henvendelser.length) {
        index = 0;
    }

    ActionHandlers[Constants.VALGT_HENVENDELSE]({
        data: henvendelser[index]
    });
};

ActionHandlers[Constants.FORRIGE_HENVENDELSE] = (action) => {
    let henvendelser = _HenvendelseStore.getSisteNEndret(10);
    let index = henvendelser.indexOf(_valgtHenvendelse);

    index--;

    if (index < 0) {
        index = henvendelser.length-1;
    }

    ActionHandlers[Constants.VALGT_HENVENDELSE]({
        data: henvendelser[index]
    });
};

ActionHandlers[Constants.TOGGLE_HENVENDELSE_LISTE] = (action) => {
    _visHenvendelseListe = !_visHenvendelseListe;
    _HenvendelseStore.emitChange();
};

AppDispatcher.register(function (action) {
    var callback = ActionHandlers[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _HenvendelseStore;