import React from 'react';

class BusinessValue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rate = this.props.value;
        let style = {
            "fontSize": ""+Math.min(Math.round(rate + 10), 30)+"px",
            "color": rate >= 30 ? 'red' : 'black'
        };

        let qualifier = ' No ';
        if (rate >= 30) {
            qualifier = ' Wow. Such '
        } else if (rate >= 20) {
            qualifier = ' Much ';
        } else if (rate >= 10) {
            qualifier = ' Moderate ';
        }

        let muchvalue = qualifier + "Business Value";

        return (
            <div className="business-value-container">
                <span style={style}>{rate}</span>
                <span style={style}>{muchvalue}</span>
            </div>
        );
    }
}

export default BusinessValue;