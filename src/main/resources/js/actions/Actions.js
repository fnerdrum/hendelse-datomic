import AppDispatcher from './../AppDispatcher.js';
import Constants from './../Constants.js';
import Superagent from 'superagent';

let Actions = {
    upsertHenvendelse: (henvendelse) => {
        AppDispatcher.dispatch({
            actionType: Constants.UPSERT_HENVENDELSE,
            data: henvendelse
        });
    },
    hentAlleHenvendeler: () => {
        Superagent
            .get('/henvendelse')
            .end((err, res) => {
                if (err) {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_FEILET,
                        data: null
                    });
                } else {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_OK,
                        data: res.body
                    });
                }
            })
    },
    velgHenvendelse: (henvendelse) => {
        AppDispatcher.dispatch({
            actionType: Constants.VALGT_HENVENDELSE,
            data: henvendelse
        });
    },
    valgtHendelseIndex: (hendelseIndex) => {
        AppDispatcher.dispatch({
            actionType: Constants.VALGT_HENDELSE_INDEX,
            data: hendelseIndex
        });
    },
    nesteHenvendelse: () => {
        AppDispatcher.dispatch({
            actionType: Constants.NESTE_HENVENDELSE
        });
    },
    forrigeHenvendelse: () => {
        AppDispatcher.dispatch({
            actionType: Constants.FORRIGE_HENVENDELSE
        });
    },
    toggleHenvendelseListeVisning: () => {
        AppDispatcher.dispatch({
            actionType: Constants.TOGGLE_HENVENDELSE_LISTE
        })
    }
};

export default Actions;