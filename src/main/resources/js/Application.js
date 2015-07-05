import React from 'react';
import { RouteHandler } from 'react-router';
import HenvendelseStore from './stores/HenvendelseStore.js';
import HenvendelseListe from './components/HenvendelseListe.js';
import HenvendelseVisning from './components/HenvendelseVisning.js';
import Actions from './actions/Actions.js';
import WebAPI from './WebAPI';

import Menu from './components/Menu.js';

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.henvendelseAPI = new WebAPI('/henvendelse');
        this.henvendelseAPI.subscribe('/henvendelse/henvendelser', (frame) => {
            let henvendelse = JSON.parse(frame.body);
            Actions.upsertHenvendelse(henvendelse);
        });
    }

    componentDidMount() {
        Actions.hentAlleHenvendeler();
        this.henvendelseAPI.connect();
    }

    componentWillUnmount() {
        this.henvendelseAPI.disconnect();
    }

    render() {
        return (
            <div className="application">
                <h1 className="hoved-header">Henvendelse-Datomic</h1>
                <Menu />
                <RouteHandler />
            </div>
        );

    }
}

export default Application;