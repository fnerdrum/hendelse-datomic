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
            let erValgt = this.props.valgt === id;
            let colorClass = 'auto-color-' + (Utils.hash(id) % 10 + 1);

            return (
                <div key={id} className={colorClass}>
                    <input type="radio"
                        value={id} id={'henvendelse-' + id} name="valgt-henvendelse"
                        onChange={Actions.velgHenvendelse.bind(this, id)}
                        checked={erValgt}
                    />
                    <label htmlFor={'henvendelse-' + id}>{'Henvendelse ' + id}</label>
                </div>
            );

        });
        return (
            <div className="sist-endret visnings-boks">
                <h2 className="underheader">Sist endret</h2>
                <ul className="sist-endret-liste">
                {listeelementer}
                </ul>
            </div>
        );
    }
}

export default HenvendelseListe;