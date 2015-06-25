import React from 'react';

class StoreAwareComponent extends React.Component {
    constructor(props, store) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.getState = this.getState.bind(this);

        this.store = store;
        this.state = this.getState();
    }

    componentDidMount() {
        this.store.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        this.store.removeChangeListener(this._onChange);
    }

    getState() {
        console.log('super class getState');
        return {};
    }

    _onChange() {
        this.setState(this.getState());
    }
}

export default StoreAwareComponent;