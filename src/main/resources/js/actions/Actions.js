import AppDispatcher from './../AppDispatcher.js';
import Constants from './../Constants.js';

let Actions = {
    setValue: function (value) {
        AppDispatcher.dispatch({
            actionType: Constants.SET_VALUE,
            data: value

        });
    }
};

export default Actions;