import React from 'react';
import HenvendelseStore from './../stores/HenvendelseStore.js';
import HistoriskVisning from './../components/HistoriskVisning.js'

class HistoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.henvendelser = HenvendelseStore.getSisteNEndret(10);

        this.oppdater = this.oppdater.bind(this);
    }

    oppdater() {
        this.setState({
           henvendelser: HenvendelseStore.getSisteNEndret(10)
        });
    }

    render() {
        return (
            <div className="historic-view">
                <h2>Historisk visning av siste 20</h2>

                <button onClick={this.oppdater}>Oppdater</button>

                <HistoriskVisning henvendelser={this.state.henvendelser}/>
            </div>
        );
    }
}

export default HistoryView;