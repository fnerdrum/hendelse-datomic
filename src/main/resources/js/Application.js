import React from 'react';
import CounterStore from './stores/Store.js';
import Counter from './components/Counter.js';
var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

var stompClient = null;

function getState() {
    return {
        counter: CounterStore.getValue()
    }
}

function connectToWS() {
    var socket = new SockJS('/hendelse');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/hendelse/hendelser', function (hendelse) {
            console.log(JSON.parse(hendelse.body));
        });
    });
}

function disconnectFromWS() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
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
        connectToWS();
    }

    componentWillUnmount() {
        CounterStore.removeChangeListener(this._onChange);
        disconnectFromWS();
    }

    _onChange() {
        this.setState(getState);
    }

    render() {
        return <Counter value={this.state.counter} />

    }
}

export default Application;