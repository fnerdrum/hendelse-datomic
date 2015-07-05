import React from 'react';
import Utils from './../Utils.js';
import Actions from './../actions/Actions.js';
import vis from 'vis';

class HistoriskVisning extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.node = React.findDOMNode(this.refs.mydiv);
        let ds = this.getHendelseData(this.props);
        this.groups = new vis.DataSet(ds.groups);
        this.items = new vis.DataSet(ds.items);

        this.timeline = new vis.Timeline(this.node);
        this.timeline.setOptions({clickToUse: true});
        this.timeline.setGroups(this.groups);
        this.timeline.setItems(this.items);
    }

    componentWillUnmount() {
        this.timeline.destroy();
        this.groups.clear();
        this.items.clear();
        this.node = null;
    }

    componentDidUpdate() {
        this.groups.clear();
        this.items.clear();

        let ds = this.getHendelseData(this.props);

        this.groups.add(ds.groups);
        this.items.add(ds.items);

        this.timeline.fit({
            animation: false
        });
    }

    render() {
        return <div ref="mydiv"></div>;
    }

    getHendelseData(props) {
        let groups = props.henvendelser.map(function (henvendelse) {
            return {
                id: henvendelse.behandlingsId,
                content: henvendelse.behandlingsId
            }
        });
        let items = props.henvendelser.reduce(function (accu, henvendelse) {
            let liste = lagHendelseListe(henvendelse);
            return accu.concat(liste);
        }, []);

        return {
            groups: groups,
            items: items
        };
    }
}

function lagHendelseListe(henvendelse) {
    return henvendelse.hendelseList.map(function (hendelse, idx, list) {
        let toDate = list[idx + 1] !== undefined ? Utils.datoFraInstant(list[idx + 1].time) : Utils.datoFraInstant(hendelse.time);
        return {
            id: henvendelse.behandlingsId + '-' + idx,
            group: henvendelse.behandlingsId,
            content: hendelse.type,
            start: Utils.datoFraInstant(hendelse.time)
        }
    });
}

export default HistoriskVisning;