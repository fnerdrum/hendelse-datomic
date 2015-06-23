import React from 'react';
import CounterStore from './stores/Store.js';
import Counter from './components/Counter.js';

function getState() {
    return {
        counter: CounterStore.getValue()
    }
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = getState();

        //En negativ side ved ES6, auto-binding fra React funker ikke. :(
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        CounterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CounterStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getState);
    }

    render() {
        return <Counter value={this.state.counter} />

    }
}

export default Application;