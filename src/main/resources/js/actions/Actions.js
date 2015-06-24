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
    }
};

export default Actions;