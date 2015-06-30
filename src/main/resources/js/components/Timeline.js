import React from 'react';
import Utils from './../Utils.js';
import Actions from './../actions/Actions.js';
import vis from 'vis';

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.lagTimeline = this.lagTimeline.bind(this);
    }

    componentDidMount() {
        this.lagTimeline(this.props);
    }

    componentWillReceiveProps(nyProps) {
        this.lagTimeline(nyProps);
    }

    lagTimeline(props) {
        let node = React.findDOMNode(this.refs.mydiv);
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        let dataset = new vis.DataSet(this.getHendelseData(props));
        let timeline = new vis.Timeline(node, dataset, {clickToUse: true});
        let idx = props.henvendelse.hendelseList.indexOf(props.hendelse);

        timeline.setSelection(idx);
        timeline.on('select', function(event){
            let idx = event.items[0];
            Actions.valgtHendelseIndex(idx);
        });
    }

    render() {
        return <div ref="mydiv"></div>;
    }

    getHendelseData(props) {
        var arr = props.henvendelse.hendelseList.slice(0);
        return arr.map(function (hendelse, idx, list) {
                let toDate = list[idx + 1] !== undefined ? Utils.datoFraInstant(list[idx + 1].time) : Utils.datoFraInstant(hendelse.time);
                return {
                    id: idx,
                    content: hendelse.type,
                    start: Utils.datoFraInstant(hendelse.time)
                }
            }
        );
    }
}
export default Timeline;