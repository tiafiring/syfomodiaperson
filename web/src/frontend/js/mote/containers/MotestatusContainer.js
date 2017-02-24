import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as arbeidstakerActions from '../actions/arbeidstaker_actions';
import * as moteActions from '../actions/moter_actions';
import MotebookingStatus from '../components/MotebookingStatus';

export class MotebookingStatusWrapper extends Component {
    componentWillMount() {
        const { fnr, hentArbeidstaker } = this.props;
        hentArbeidstaker(fnr);
    }

    render() {
        const { henter } = this.props;

        if (henter) {
            return null;
        }

        return <MotebookingStatus {...this.props} />;
    }
}

MotebookingStatusWrapper.propTypes = {
    henter: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const fnr = state.navbruker.data.fnr;
    const moteUuid = ownProps.moteUuid;
    const mote = state.moter.data.filter((m) => {
        return m.moteUuid === moteUuid;
    })[0];


    mote.deltakere = mote.deltakere.sort((d1, d2) => {
        return d2.type.localeCompare(d1.type);
    }).map((deltaker) => {
        deltaker.svar = deltaker.svar.sort((a1, a2) => {
            return new Date(a2.tid).getTime() <= new Date(a1.tid).getTime() ? 1 : -1;
        });
        return deltaker;
    });

    mote.alternativer = mote.alternativer.sort((a1, a2) => {
        return new Date(a2.tid).getTime() <= new Date(a1.tid).getTime() ? 1 : -1;
    });

    return {
        fnr,
        mote,
        avbrytFeilet: state.moter.avbrytFeilet,
        avbryter: state.moter.avbryter,
        henter: state.moter.henter || state.arbeidstaker.henter || state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
        arbeidstaker: state.arbeidstaker.data,
        antallNyeTidspunkt: state.moter.antallNyeTidspunkt,
        nyeAlternativFeilet: state.moter.nyeAlternativFeilet,
        senderNyeAlternativ: state.moter.senderNyeAlternativ,
    };
};

const MotestatusContainer = connect(mapStateToProps, Object.assign({}, moteActions, arbeidstakerActions))(MotebookingStatusWrapper);

export default MotestatusContainer;
