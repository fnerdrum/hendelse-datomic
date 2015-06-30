import React from 'react';
import HenvendelseStore from './stores/HenvendelseStore.js';
import HenvendelseListe from './components/HenvendelseListe.js';
import HenvendelseVisning from './components/HenvendelseVisning.js';
import BusinessValue from './components/BusinessValue.js';
import Actions from './actions/Actions.js';
import WebAPI from './WebAPI';

function getState() {
    return {
        valgtHenvendelse: HenvendelseStore.getValgtHenvendelse(),
        sistEndret: HenvendelseStore.getSisteNEndret(10),
        wsrate: HenvendelseStore.getRate()
    }
}


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = getState();

        this.henvendelseAPI = new WebAPI('/henvendelse');
        this.henvendelseAPI.subscribe('/henvendelse/henvendelser', (frame) => {
            let henvendelse = JSON.parse(frame.body);
            Actions.upsertHenvendelse(henvendelse);
            console.log('WS: ', henvendelse);
        });

        //En negativ side ved ES6, auto-binding fra React funker ikke. :(
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        HenvendelseStore.addChangeListener(this._onChange);
        Actions.hentAlleHenvendeler();
        this.henvendelseAPI.connect();
    }

    componentWillUnmount() {
        HenvendelseStore.removeChangeListener(this._onChange);
        this.henvendelseAPI.disconnect();
    }

    _onChange() {
        this.setState(getState());
    }

    render() {
        return (
            <div className="application">
                <h1 className="hoved-header">Henvendelse-Datomic</h1>
                <HenvendelseListe liste={this.state.sistEndret} valgt={this.state.valgtHenvendelse}/>
                <HenvendelseVisning henvendelse={this.state.valgtHenvendelse} />
                <BusinessValue value={this.state.wsrate} />
            </div>
        );

    }
}

export default Application;