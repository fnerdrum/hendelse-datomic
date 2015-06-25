import React from 'react';
import HenvendelseStore from './../stores/HenvendelseStore.js';
import StoreAwareComponent from './StoreAwareComponent.js';
import HendelseVisning from './HendelseVisning.js';
import Utils from './../Utils.js';

class HenvendelseVisning extends StoreAwareComponent {
    constructor(props) {
        super(props, HenvendelseStore);
    }

    getState() {
        console.log('subclas getState');
        return {
            valgtHendelseIndex: HenvendelseStore.getValgtHendelseIndex()
        };
    }

    render() {
        console.log('prop', this.props.henvendelse);
        console.log('valgt', this.state.valgtHendelseIndex);
        if (!this.props.henvendelse) {
            return (
                <div className="henvendelse-visning visnings-boks">
                    <h2 className="underheader">Henvendelse</h2>
                    <p>Ingen henvendelse valgt.</p>
                </div>
            );
        }

        let henvendelse = this.props.henvendelse;
        let sistEndret = Utils.tilDato(henvendelse.lastUpdate.epochSecond);
        let behandlingsId = henvendelse.behandlingsId;


        let harTidligereHendelser = this.state.valgtHendelseIndex > 0;
        let harSenereHendelser = this.state.valgtHendelseIndex < henvendelse.hendelseList.length - 1;

        let valgtHendelse = henvendelse.hendelseList[this.state.valgtHendelseIndex];

        return (
            <div className="henvendelse-visning visnings-boks">
                <h2 className="underheader">Hendelser</h2>
                <p>{'Behandlingsid: ' + behandlingsId }</p>
                <p>{'Sist endret: ' + sistEndret }</p>
                <hr/>
                <HendelseVisning hendelse={valgtHendelse} />
            </div>
        );
    }
}

export default HenvendelseVisning;