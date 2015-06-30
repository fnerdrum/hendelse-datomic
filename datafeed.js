var ScenarioBuilder = require('./ScenarioBuilder.js');
var scenarioer = [];

function lagBehandlingsId() {
    return Math.round(Math.random() * 1000000);
}

scenarioer.push(
    new ScenarioBuilder()
        .wait(100)
        .opprett()
        .wait(Math.round(Math.random() * 5000) + 5000)
        .besvar()
        .wait(100)
);

//scenarioer.push(
//    new ScenarioBuilder()
//        .wait(100)
//        .opprett()
//        .wait(100)
//);

scenarioer.push(
    new ScenarioBuilder()
        .wait(100)
        .opprett()
        .wait(Math.round(Math.random() * 3000) + 2000)
        .kontorsperr()
        .wait(100)
);


function startScenario() {
    var behandlingsId = lagBehandlingsId();
    var scenario = scenarioer[Math.floor(Math.random() * scenarioer.length)];
    scenario.exec(behandlingsId);

    setTimeout(startScenario, Math.round(Math.random() * 2000));
}

function start(num) {
    if (num > 0) {
        startScenario();
        setTimeout(start.bind(this, num - 1), Math.random() * 4000);
    }
}
start(10);
