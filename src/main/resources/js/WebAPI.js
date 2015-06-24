import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebAPI {
    constructor(uri) {
        this.uri = uri;
        this.isConnected = false;
        this.socket = new SockJS(uri);
        this.stomp = Stomp.over(this.socket);
        this.stomp.debug = function (){};
        this.subscriptions = [];
    }

    connect(options, callback) {
        let that = this;
        let safeOptions = options || {};

        this.stomp.connect(safeOptions, (frame) => {
            console.log('Connected to ' + that.uri);

            for (let stream in that.subscriptions) {
                that.stomp.subscribe(stream, that.subscriptions[stream]);
            }

            that.isConnected = true;
            if (callback) {
                callback();
            }
        });
    }

    disconnect(callback) {
        if (this.stomp !== null) {
            this.stomp.disconnect();
        }
        this.isConnected = false;
        console.log('Disconnected from ' + this.uri);
        if (callback) {
            callback();
        }
    }

    subscribe(stream, callback) {
        this.subscriptions[stream] = callback;

        if (this.isConnected) {
            this.stomp.subscribe(stream, callback);
        }
    }
}

export default WebAPI;