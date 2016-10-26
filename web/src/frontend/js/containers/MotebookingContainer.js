import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjema from '../mote/skjema/MotebookingSkjema';
import MotebookingStatus from '../mote/skjema/MotebookingStatus';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as actionCreators from '../mote/actions/moter_actions';

class MotebookingSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
    }

    render() {
        const { henter, hentingFeilet, mote } = this.props;
        return (<Side tittel="Møtebooking">
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                if (mote) {
                    return <MotebookingStatus mote={mote} />;
                }
                return <MotebookingSkjema {...this.props} />;
            })()
        }
        </Side>);
    }
}

MotebookingSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    hentMoter: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    const fnr = state.navbruker.data.fnr;
    const mote = state.moter.data && state.moter.data.length > 0 ? state.moter.data[0] : undefined;

    return {
        fnr,
        mote,
        henter: state.moter.henter,
        sender: state.moter.sender,
        hentingFeilet: state.moter.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
    };
};

const MotebookingContainer = connect(mapStateToProps, actionCreators)(MotebookingSide);

export default MotebookingContainer;
