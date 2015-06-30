import React from 'react';
import Utils from './../Utils.js';
import vis from 'vis';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let dataset = new vis.DataSet(this.getHendelseData(this.props));
        this.timeline = new vis.Timeline(React.findDOMNode(this.refs.mydiv), dataset, {});
    }

    componentWillReceiveProps(nyProps) {
        var node = React.findDOMNode(this.refs.mydiv);
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        let dataset = new vis.DataSet(this.getHendelseData(nyProps));
        new vis.Timeline(node, dataset, {});
    }


    render() {
        return <div ref="mydiv"></div>;
    }

    getHendelseData(props) {
        var arr = props.henvendelse.hendelseList.slice(0).reverse();
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