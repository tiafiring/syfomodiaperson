import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as moteActions from '../actions/moter_actions';
import MotebookingStatus from '../components/MotebookingStatus';

export const MotebookingStatusWrapper = (props) => {
    if (props.henter) {
        return null;
    }
    return <MotebookingStatus {...props} />;
};

MotebookingStatusWrapper.propTypes = {
    henter: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const fnr = state.navbruker.data.fnr;
    const moteUuid = ownProps.moteUuid;
    const mote = state.moter.data.filter((m) => {
        return m.moteUuid === moteUuid;
    })[0];
    return {
        fnr,
        mote,
        avbrytFeilet: state.moter.avbrytFeilet || state.ledetekster.henter,
        avbryter: state.moter.avbryter,
        henter: state.moter.henter || state.arbeidstaker.henter,
        ledetekster: state.ledetekster.data,
        arbeidstaker: state.arbeidstaker.data,
        antallNyeTidspunkt: state.moter.antallNyeTidspunkt,
        nyeAlternativFeilet: state.moter.nyeAlternativFeilet,
        senderNyeAlternativ: state.moter.senderNyeAlternativ,
    };
};

const MotestatusContainer = connect(mapStateToProps, moteActions)(MotebookingStatusWrapper);

export default MotestatusContainer;
