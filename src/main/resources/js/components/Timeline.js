import React from 'react';
import Utils from './../Utils.js';
import GoogleCharts from 'react-google-charts';
let Chart = GoogleCharts.Chart;

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        var options = {
            title: 'Hendelseshistorikk',
            legend: 'none'
        };
        this.state = {
            'data': [],
            'options': options
        };
    }

    render() {
        let hendelseData = [['Navn', 'Type', 'Fom', 'Tom']].concat(this.getHendelseData());

        return (
            <Chart chartType = "Timeline" data = {hendelseData} options = {this.state.options}  width={"100%"} height={"300px"} graph_id = "timeline_graph"  />
        );
    }
    getHendelseData() {
        var arr = this.props.henvendelse.hendelseList.slice(0).reverse();
        return arr.map(function (hendelse, idx, list) {
            let toDate = list[idx + 1] !== undefined ? Utils.datoFraInstant(list[idx + 1].time) : Utils.datoFraInstant(hendelse.time);
            return [
                'Henvendelse',
                hendelse.type,
                Utils.datoFraInstant(hendelse.time),
                toDate
            ]
        });
    }
}

export default Timeline;