var ScenarioBuilder = require('./ScenarioBuilder.js');
var scenarioer = [];

function lagBehandlingsId() {
    return Math.round(Math.random() * 1000000);
}

var sc1 = new ScenarioBuilder()
    .wait(100)
    .opprett()
    .wait(Math.round(Math.random() * 1000) + 1000)
    .besvar()
    .wait(100);

var sc2 = new ScenarioBuilder()
    .wait(100)
    .opprett()
    .wait(100);

var sc3 = new ScenarioBuilder()
    .wait(100)
    .opprett()
    .wait(Math.round(Math.random() * 1000) + 1000)
    .kontorsperr()
    .wait(100);

var sc4 = new ScenarioBuilder()
    .opprett()
    .wait(Math.random() * 1000 + 1000)
    .besvar()
    .wait(Math.random() * 1000 + 1000)
    .kontorsperr();

scenarioer = scenarioer.concat([sc4]);

function startScenario() {
    var behandlingsId = lagBehandlingsId();
    var scenario = scenarioer[Math.floor(Math.random() * scenarioer.length)];
    scenario.exec(behandlingsId);

    setTimeout(startScenario, Math.round(Math.random() * 500));
}

function start(num) {
    if (num > 0) {
        startScenario();
        setTimeout(start.bind(this, num - 1), Math.random() * 4000);
    }
}
start(10);
