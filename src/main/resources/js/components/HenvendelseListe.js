import React from 'react';
import Actions from './../actions/Actions.js';

class HenvendelseListe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var listeelementer = this.props.liste.map((henvendelse) => {
            let id = henvendelse.behandlingsId;
            let erValgt = this.props.valgt === id;

            return (
                <div key={id}>
                    <input type="radio"
                        value={id} id={'henvendelse-' + id} name="valgt-henvendelse"
                        onChange={Actions.velgHenvendelse.bind(this, id)}
                        checked={erValgt}
                    />
                    <label htmlFor={'henvendelse-' + id}>Henvendelse {id} </label>
                </div>
            );

        });
        return (
            <div className="sist-endret">
                <h1>Sist endret</h1>
                <ul className="sist-endret-liste">
                {listeelementer}
                </ul>
            </div>
        );
    }
}

export default HenvendelseListe;