import React, { Component, PropTypes } from 'react';
import PilNed from '../../ikoner/PilNed';
import PilOpp from '../../ikoner/PilOpp';

export class UtvidbarHistorikk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vis: true,
        };
    }

    toggle() {
        this.setState({
            vis: !this.state.vis,
        });
    }


    render() {
        return (<div>
            <div onClick={() => {this.toggle()} } style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }}>
                {this.props.head}
                { this.state.vis ? <PilNed /> : <PilOpp style={{ flex: '1' }} />}
            </div>
                { this.state.vis && <div>{this.props.body}</div> }
            </div>);
    }
}

UtvidbarHistorikk.propTypes = {

};

export default UtvidbarHistorikk;
