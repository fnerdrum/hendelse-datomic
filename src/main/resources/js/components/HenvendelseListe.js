import React from 'react';

class HenvendelseListe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var listeelementer = this.props.liste.map((henvendelse) => {
            let id = henvendelse.behandlingsId;

            return <li key={id}>Henvendelse: {id}</li>
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