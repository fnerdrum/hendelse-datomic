import React from 'react';
import Actions from './../actions/Actions.js';
import Utils from './../Utils.js';

window.Utils = Utils;

class HenvendelseListe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var listeelementer = this.props.liste.map((henvendelse) => {
            let id = henvendelse.behandlingsId;
            let antallHendelser = henvendelse.hendelseList.length;
            let erValgt = this.props.valgt.behandlingsId === id;
            let divclass = erValgt ? 'checked' : '';

            return (
                <div key={id} className={divclass} >
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
        return (
            <div className="sist-endret visnings-boks">
                <h2 className="underheader">Henvendelser</h2>
                <ul className="sist-endret-liste">
                {listeelementer}
                </ul>
            </div>
        );
    }
}

export default HenvendelseListe;