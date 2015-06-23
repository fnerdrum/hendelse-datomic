import React from 'react';
import Actions from './../actions/Actions.js';

class Counter extends React.Component {
    render() {
        return (
            <div>
                <h1>Counter</h1>
                <span>Verdi: {this.props.value}</span>
                <button onClick={Actions.setValue.bind(this, this.props.value + 1)}>Inc</button>
            </div>
        );
    }
}

export default Counter;