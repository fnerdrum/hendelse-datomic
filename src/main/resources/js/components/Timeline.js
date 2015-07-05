import React from 'react';
import Utils from './../Utils.js';
import Actions from './../actions/Actions.js';
import vis from 'vis';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.redraw = false;
    }

    componentDidMount() {
        this.node = React.findDOMNode(this.refs.mydiv);
        this.dataset = window.dataset = new vis.DataSet(this.getHendelseData(this.props));
        this.timeline = window.timeline = new vis.Timeline(this.node, this.dataset, {clickToUse: true});
        this.selectedID = this.props.henvendelse.hendelseList.indexOf(this.props.hendelse);

        this.timeline.setSelection(this.selectedID);
        this.timeline.on('select', function (event) {
            let idx = event.items[0];
            Actions.valgtHendelseIndex(idx);
        });
    }

    componentWillUnmount() {
        this.timeline.destroy();
        this.dataset.clear();
        this.node = null;
    }

    componentDidUpdate() {
        if (this.redraw) {
            console.log('redrawing');
            this.dataset.clear();
            this.dataset.add(this.getHendelseData(this.props));
        }

        this.selectedID = this.props.henvendelse.hendelseList.indexOf(this.props.hendelse);
        this.timeline.setSelection(this.selectedID);

        this.timeline.fit({
            animation: false
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.henvendelse.behandlingsId !== nextProps.henvendelse.behandlingsId) {
            this.redraw = true;
            return true;
        } else if (this.props.hendelse.time.epochSecond !== nextProps.hendelse.time.epochSecond) {
            this.redraw = false;
            return true;
        } else if (this.props.henvendelse.hendelseList.length !== nextProps.henvendelse.hendelseList.length) {
            this.redraw = true;
            return true;
        } else {
            this.redraw = false;
            return this.props.hendelse.time.nano !== nextProps.hendelse.time.nano;
        }
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