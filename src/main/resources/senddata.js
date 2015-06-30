var prompt = require('sync-prompt').prompt;
var superagent = require('superagent');
var format = require('format');

var henvendelser = [];

superagent
    .get('http://localhost:8080/henvendelse')
    .end(function (err, res) {
        if (err) {
            console.error('Noe gikk feil i uthenting av henvendelser');
            return 1;
        }
        henvendelser = res.body;
        startPrompt();
    });


function startPrompt(behandlingsId, type, value) {

    var data = {
        behandlingsId: promptOrDefault('BehandlingsId: ', behandlingsId),
        type: promptOrDefault('Type: ', type),
        value: promptOrDefault('Value: ', value)
    };

    superagent
        .post('http://localhost:8080/hendelse/receive', data)
        .end(function (err, res) {
            if (err) {
                console.log('error while posting');
            } else {
                console.log('resp: ', res.body);

                var mer = prompt('Fortsett? [y]')
                if (mer === '') {
                    startPrompt(behandlingsId, type, value);
                }
            }
        });
}

function promptOrDefault(promptStr, defaultValue) {
    if (defaultValue && defaultValue.length > 0) {
        var value = prompt(promptStr + ' [' + defaultValue + '] ?');
        if (value === '') {
            return defaultValue;
        } else {
            value;
        }
    } else {
        return prompt(promptStr);
    }
}