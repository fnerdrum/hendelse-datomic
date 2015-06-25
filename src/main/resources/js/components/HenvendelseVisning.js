import React from 'react';
import HenvendelseStore from './../stores/HenvendelseStore.js';
import StoreAwareComponent from './StoreAwareComponent.js';
import HendelseVisning from './HendelseVisning.js';
import Actions from './../actions/Actions.js';
import Utils from './../Utils.js';

const PIL_HOYRE = 39;
const PIL_VENSTRE = 37;

class HenvendelseVisning extends StoreAwareComponent {
    constructor(props) {
        super(props, HenvendelseStore);

        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    getState() {
        console.log('subclas getState');
        return {
            valgtHendelseIndex: HenvendelseStore.getValgtHendelseIndex()
        };
    }

    keyDownHandler(event) {
        if (event.keyCode === PIL_HOYRE) {
            Actions.valgtHendelseIndex(this.state.valgtHendelseIndex + 1);
        } else if (event.keyCode === PIL_VENSTRE) {
            Actions.valgtHendelseIndex(this.state.valgtHendelseIndex - 1);
        }
    }

    render() {
        if (!this.props.henvendelse) {
            return (
                <div className="henvendelse-visning visnings-boks">
                    <h2 className="underheader">Henvendelse</h2>
                    <p>Ingen henvendelse valgt.</p>
                </div>
            );
        }

        let henvendelse = this.props.henvendelse;
        let valgtHendelse = henvendelse.hendelseList[this.state.valgtHendelseIndex];
        let sistEndret = Utils.tilDato(valgtHendelse.time.epochSecond);
        let behandlingsId = henvendelse.behandlingsId;


        let harTidligereHendelser = this.state.valgtHendelseIndex > 0;
        let harSenereHendelser = this.state.valgtHendelseIndex < henvendelse.hendelseList.length - 1;

        let tidligerePilClass = 'pil-knapp tidligere-hendelser' + (harTidligereHendelser ? '' : ' disabled');
        let senerePilClass = 'pil-knapp senere-hendelser' + (harSenereHendelser ? '' : ' disabled');
        let tidligerePilAria = 'Tidligere hendelser' + (harTidligereHendelser ? '' : ' disabled');
        let senerePilAria = 'Sendere hendelser' + (harSenereHendelser ? '' : ' disabled');


        let tidligerePilCallback = Actions.valgtHendelseIndex.bind(this, this.state.valgtHendelseIndex - 1);
        let senerePilCallback = Actions.valgtHendelseIndex.bind(this, this.state.valgtHendelseIndex + 1);

        return (
            <section className="henvendelse-visning visnings-boks" tabIndex="0" onKeyDown={this.keyDownHandler}>
                <button className={tidligerePilClass} aria-label={tidligerePilAria} onClick={tidligerePilCallback} />
                <button className={senerePilClass} aria-label={senerePilAria} onClick={senerePilCallback} />
                <h2 className="underheader">{behandlingsId}</h2>
                <p className="endret-dato">{sistEndret}</p>
                <hr/>
                <HendelseVisning hendelse={valgtHendelse} />
            </section>
        );
    }
}

export default HenvendelseVisning;