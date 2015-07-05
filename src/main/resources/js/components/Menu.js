import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="visnings-boks menu" role="navigation">
                <Link to="index">Forside</Link>
                <Link to="live">Live-visning</Link>
                <Link to="history">Historisk-visning</Link>
            </nav>
        );
    }
}

export default Menu;