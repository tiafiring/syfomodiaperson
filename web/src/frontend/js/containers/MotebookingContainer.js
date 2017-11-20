import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjemaContainer from '../mote/containers/MotebookingSkjemaContainer';
import MotestatusContainer from '../mote/containers/MotestatusContainer';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../actions/moter_actions';
import { MOETEPLANLEGGER } from '../menypunkter';

export class MotebookingSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
    }

    render() {
        const { henter, hentMoterFeiletBool, mote, ikkeTilgang, ikkeTilgangFeilmelding, ledetekster } = this.props;
        return (<Side tittel="Møteplanlegger" aktivtMenypunkt={MOETEPLANLEGGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (ikkeTilgang) {
                        return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
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
    ikkeTilgang: PropTypes.bool,
    ikkeTilgangFeilmelding: PropTypes.string,
    virksomhet: PropTypes.object,
    hentMoter: PropTypes.func,
    hentLedere: PropTypes.func,
    nullstillVirksomhet: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    henter: PropTypes.bool,
    ledetekster: PropTypes.object,
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
        henter: state.moter.henter || state.ledetekster.henter || state.ledere.henter,
        sender: state.moter.sender,
        ledetekster: state.ledetekster.data,
        hentMoterFeiletBool: state.moter.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
};

const MotebookingContainer = connect(mapStateToProps, moterActions)(MotebookingSide);

export default MotebookingContainer;
