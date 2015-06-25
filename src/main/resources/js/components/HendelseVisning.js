import React from 'react';

class HendelseVisning extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let hendelse = this.props.hendelse;

        return (
            <div className="hendelse-visning" aria-live="polite" aria-atomic="true" >
                <p>{'Type: ' + hendelse.type}</p>
                <p>{'Value: ' + hendelse.value}</p>
            </div>
        );
    }
}

export default HendelseVisning;