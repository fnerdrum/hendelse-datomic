import React from 'react';
import StoreAwareComponent from './../components/StoreAwareComponent.js';
import HenvendelseStore from './../stores/HenvendelseStore.js';

import HenvendelseListe from './../components/HenvendelseListe.js';
import HenvendelseVisning from './../components/HenvendelseVisning.js';
import BusinessValue from './../components/BusinessValue.js';


class LiveView extends StoreAwareComponent {
    constructor(props) {
        super(props, HenvendelseStore);
    }

    getState() {
        return {
            valgtHenvendelse: HenvendelseStore.getValgtHenvendelse(),
            sistEndret: HenvendelseStore.getSisteNEndret(10),
            wsrate: HenvendelseStore.getRate()
        }
    }

    render() {
        return (
            <div className="liveview">
                <HenvendelseListe liste={this.state.sistEndret} valgt={this.state.valgtHenvendelse}/>
                <HenvendelseVisning henvendelse={this.state.valgtHenvendelse} />
                <BusinessValue></BusinessValue>
            </div>
        );
    }
}

export default LiveView;