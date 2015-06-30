var Pipeline = require('pipes-and-filters');
var agent = require('superagent');

function Scenario() {
    this.pipeline = Pipeline.create();
}
Scenario.prototype.opprett = function () {
    this.pipeline.use(function (input, next) {
        console.log('executing "opprettet" for ', input);
        post({
            behandlingsId: input,
            type: 'Opprettet',
            value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem culpa ea et minima nulla sed tempore temporibus velit voluptates! Illo laudantium libero molestiae nemo quidem rerum unde voluptatem voluptatum!'
        }).end(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, input);
            }
        });
    });
    return this;
};

Scenario.prototype.besvar = function () {
    this.pipeline.use(function (input, next) {
        console.log('executing "besvart" for ', input);
        post({
            behandlingsId: input,
            type: 'Besvart',
            value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem culpa ea et minima nulla sed tempore temporibus velit voluptates! Illo laudantium libero molestiae nemo quidem rerum unde voluptatem voluptatum!'
        }).end(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, input);
            }
        });
    });
    return this;
};

Scenario.prototype.kontorsperr = function () {
    this.pipeline.use(function (input, next) {
        console.log('executing "Kontorsperret" for ', input);
        post({
            behandlingsId: input,
            type: 'Kontorsperret',
            value: 'Enhet ' + Math.round(Math.random() * 9000 + 1000)
        }).end(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, input);
            }
        });
    });
    return this;
};

Scenario.prototype.opprettOppgave = function () {
    this.pipeline.use(function (input, next) {
        console.log('executing "Oppgave Oppretttet" for ', input);
        post({
            behandlingsId: input,
            type: 'Oppgave Oppretttet',
            value: 'OppgaveId ' + Math.round(Math.random() * 9000 + 10000)
        }).end(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, input);
            }
        });
    });
    return this;
};

Scenario.prototype.knyttTilSak = function () {
    this.pipeline.use(function (input, next) {
        console.log('executing "Knyttet Til Sak" for ', input);
        post({
            behandlingsId: input,
            type: 'Knyttet Til Sak',
            value: 'SaksId ' + Math.round(Math.random() * 15000 + 20000)
        }).end(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, input);
            }
        });
    });
    return this;
};

Scenario.prototype.wait = function (timeout) {
    this.pipeline.use(function (input, next) {
        setTimeout(function () {
            next(null, input);
        }, timeout);
    });
    return this;
};

Scenario.prototype.exec = function (behandlingsId) {
    this.pipeline.execute(behandlingsId);
};

function post(data) {
    return agent.post('http://localhost:8080/hendelse/receive', data).type('form');
}


module.exports = Scenario;