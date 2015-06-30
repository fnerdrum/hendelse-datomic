import React from 'react';

class BusinessValue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rate = this.props.value;
        let style = {
            "fontSize": ""+Math.min(Math.round(rate + 10), 30)+"px",
            "color": rate > 30 ? 'red' : 'black'
        };

        return (
            <div className="business-value-container">
                <span style={style}>{rate}</span>
            </div>
        );
    }
}

export default BusinessValue;