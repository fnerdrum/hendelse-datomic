import React from 'react';
import Actions from './../actions/Actions.js';
import Utils from './../Utils.js';
import StoreAwareComponent from './StoreAwareComponent.js';
import HenvendelseStore from './../stores/HenvendelseStore.js';

class HenvendelseListe extends StoreAwareComponent {
    constructor(props) {
        super(props, HenvendelseStore);
    }

    getState() {
        return {
            visListe: HenvendelseStore.getVisHenvendelseListe()
        }
    }

    render() {
        var listeelementer = this.props.liste.map((henvendelse) => {
            let id = henvendelse.behandlingsId;
            let antallHendelser = henvendelse.hendelseList.length;

            let erValgt = this.props.valgt ? this.props.valgt.behandlingsId === id : false;
            let divclass = erValgt ? 'checked' : '';

            return (
                <div key={id} className={divclass} role="listitem" >
                    <input type="radio"
                        value={id} id={'henvendelse-' + id} name="valgt-henvendelse"
                        onChange={Actions.velgHenvendelse.bind(this, henvendelse)}
                        checked={erValgt}
                    />
                    <label htmlFor={'henvendelse-' + id} className="clearfix">
                        <p className="behandlingsid">{'ID: ' + id}</p>
                        <p className="antall-hendelser">{antallHendelser}</p>
                    </label>
                </div>
            );
        });

        let listeClass = 'sist-endret-liste' + (this.state.visListe ? '' : ' kollapset');
        let toggleClass = 'c-hamburger c-hamburger--htx' + (!this.state.visListe ? '' : ' is-active');

        return (
            <section className="sist-endret visnings-boks" tabIndex="0" aria-labelledby="sist-endret-header">
                <button onClick={Actions.toggleHenvendelseListeVisning} className={toggleClass}>
                    <span>Toggle</span>
                </button>
                <h2 id="sist-endret-header" className="underheader">Henvendelser</h2>
                <section className={listeClass} role="list">
                {listeelementer}
                </section>
            </section>
        );
    }
}

export default HenvendelseListe;