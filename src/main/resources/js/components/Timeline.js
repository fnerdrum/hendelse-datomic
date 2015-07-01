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

    componentDidUpdate() {
        this.lagTimeline(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.henvendelse.behandlingsId !== nextProps.henvendelse.behandlingsId) {
            return true;
        } else if (this.props.hendelse.time.epochSecond !== nextProps.hendelse.time.epochSecond) {
             return true;
        } else if(this.props.henvendelse.hendelseList.length !== nextProps.henvendelse.hendelseList.length) {
            return true;
        } else {
            return this.props.hendelse.time.nano !== nextProps.hendelse.time.nano;
        }
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