import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import * as oppdialogActions from '../actions/oppfoelgingsdialoger_actions';
import Feilmelding from '../components/Feilmelding';
import Oppfoelgingsplan from '../components/oppfoelgingsdialoger/Oppfoelgingsplan';
import AppSpinner from '../components/AppSpinner';
import { OPPFOELGINGSPLANER } from '../menypunkter';

export class OppfoelgingsPlanerOversiktSide extends Component {
    componentWillMount() {
        const { fnr, actions, henterDialoger, hentetDialoger } = this.props;
        if (!henterDialoger && !hentetDialoger) {
            actions.hentOppfoelgingsdialoger(fnr);
        }
    }

    render() {
        const { oppfoelgingsdialog, ledetekster, henter, hentingFeilet, ikkeTilgang, ikkeTilgangFeilmelding, fnr } = this.props;
        return (<Side tittel="Oppfølgingsplaner" aktivtMenypunkt={OPPFOELGINGSPLANER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (ikkeTilgang) {
                        return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<div>
                        <Oppfoelgingsplan oppfoelgingsdialog={oppfoelgingsdialog} fnr={fnr} />
                    </div>);
                })()
            }
        </Side>);
    }
}

OppfoelgingsPlanerOversiktSide.propTypes = {
    ikkeTilgangFeilmelding: PropTypes.string,
    fnr: PropTypes.string,
    actions: PropTypes.object,
    oppfoelgingsdialog: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    henterDialoger: PropTypes.bool,
    hentetDialoger: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, oppdialogActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const id = parseInt(ownProps.params.oppfoelgingsdialogId, 10);
    const fnr = state.navbruker.data.fnr;
    const henter = state.oppfoelgingsdialoger.henter || state.ledetekster.henter || state.ledere.henter || state.veilederinfo.henter;
    const hentingFeilet = state.oppfoelgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet;
    const hentetDialoger = state.oppfoelgingsdialoger.hentet;
    const henterDialoger = state.oppfoelgingsdialoger.henter;

    const oppfoelgingsdialog = state.oppfoelgingsdialoger.data.filter((dialog) => {
        return dialog.id === id;
    })[0];
    return {
        brukernavn: state.navbruker.data.navn,
        oppfoelgingsdialog,
        fnr,
        henter,
        hentingFeilet,
        hentetDialoger,
        henterDialoger,
        ledetekster: state.ledetekster.data,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const OppfoelgingsPlanerOversiktContainer = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsPlanerOversiktSide);
export default OppfoelgingsPlanerOversiktContainer;
