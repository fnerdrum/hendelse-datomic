import React from 'react';
import GoogleCharts from 'react-google-charts';
let Chart = GoogleCharts.Chart;

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        var options = {
            title: 'Hendelseshistorikk',
            legend: 'none'
        };

        var data = [
                [ 'Henvendelse', 'Opprettet',     new Date(2015, 2, 1),  new Date(2015, 2, 2)],
                [ 'Henvendelse', 'Opprettet',     new Date(2015, 2, 1),  new Date(2015, 2, 2)],
                [ 'Henvendelse', 'Endret',     new Date(2015, 2, 2),  new Date(2015, 2, 3)],
                [ 'Henvendelse', 'Endret',     new Date(2015, 2, 3),  new Date(2015, 2, 4)],
                [ 'Henvendelse', 'Endret',     new Date(2015, 2, 4),  new Date(2015, 2, 5)],
                [ 'Henvendelse', 'Slettet',     new Date(2015, 2, 5),  new Date(2015, 2, 6)],
        ];
        this.state = {
            'data' : data,
            'options' : options
        };
    }
    render() {
        return (
            <Chart chartType = "Timeline" data = {this.state.data} options = {this.state.options}  width={"100%"} height={"300px"} graph_id = "timeline_graph"  />
        );
    }
}

export default Timeline;