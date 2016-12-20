import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjemaContainer from '../mote/containers/MotebookingSkjemaContainer';
import MotestatusContainer from '../mote/containers/MotestatusContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../mote/actions/moter_actions';
import { MOETEPLANLEGGER } from '../menypunkter';

export class MotebookingSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
    }

    render() {
        const { henter, hentMoterFeiletBool, mote } = this.props;
        return (<Side tittel="Møteplanlegger" aktivtMenypunkt={MOETEPLANLEGGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (mote) {
                        return <MotestatusContainer moteUuid={mote.moteUuid} />;
                    }
                    return <MotebookingSkjemaContainer {...this.props} />;
                })()
            }
        </Side>);
    }
}

MotebookingSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    virksomhet: PropTypes.object,
    hentMoter: PropTypes.func,
    hentLedere: PropTypes.func,
    nullstillVirksomhet: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    henter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
    hentLedereFeiletBool: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const fnr = state.navbruker.data.fnr;
    const aktivtMote = state.moter.data.filter((mote) => {
        return mote.status === 'OPPRETTET' || mote.status === 'BEKREFTET';
    })[0];

    return {
        fnr,
        mote: aktivtMote,
        henter: state.moter.henter,
        sender: state.moter.sender,
        hentMoterFeiletBool: state.moter.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
    };
};

const MotebookingContainer = connect(mapStateToProps, moterActions)(MotebookingSide);

export default MotebookingContainer;
