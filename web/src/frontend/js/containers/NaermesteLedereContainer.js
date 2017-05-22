import React, { PropTypes } from 'react';
import NaermesteLedere from '../components/NaermesteLedere';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Side from '../sider/Side';
import * as ledereActions from '../actions/ledere_actions';
import AppSpinner from '../components/AppSpinner';
import { NAERMESTE_LEDER } from '../menypunkter';

export const NaermesteLedereSide = ({ henter, ledere, hentingFeilet, navbruker, ikkeTilgang, ledetekster, ikkeTilgangFeilmelding }) => {
    return (<Side tittel="Nærmeste ledere" aktivtMenypunkt={NAERMESTE_LEDER}>
    {
        (() => {
            if (ikkeTilgang) {
                return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                    melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
            } else if (hentingFeilet) {
                return <Feilmelding />;
            } else if (henter) {
                return <AppSpinner />;
            }
            return <NaermesteLedere ledere={ledere} navbruker={navbruker} />;
        })()
    }
    </Side>);
};


NaermesteLedereSide.propTypes = {
    ledere: PropTypes.array,
    toggleApenLeder: PropTypes.func,
    fnr: PropTypes.string,
    ikkeTilgangFeilmelding: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    navbruker: PropTypes.object,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ledereActions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const fnr = ownProps.params.fnr;
    return {
        ledere: state.ledere.data,
        henter: state.ledere.henter || state.navbruker.henter || state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.ledere.hentingFeilet || state.navbruker.hentingFeilet,
        navbruker: state.navbruker.data,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
        fnr,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps, mapDispatchToProps)(NaermesteLedereSide);

export default NaermesteLedereContainer;
