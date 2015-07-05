import React from 'react';
import { Link } from 'react-router';

class WelcomeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="welcome-view">
                <p>For enkel visning og søk i hendelser i Henvendelse.</p>
            </div>
        );
    }
}

export default WelcomeView;