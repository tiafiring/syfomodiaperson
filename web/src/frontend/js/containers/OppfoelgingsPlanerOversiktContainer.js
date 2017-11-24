import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import * as oppdialogActions from '../actions/oppfoelgingsdialoger_actions';
import * as virksomhetActions from '../actions/virksomhet_actions';
import Feilmelding from '../components/Feilmelding';
import OppfoelgingsPlanerOversikt from '../components/oppfoelgingsdialoger/OppfoelgingsPlanerOversikt';
import AppSpinner from '../components/AppSpinner';
import IngenPlaner from '../components/oppfoelgingsdialoger/IngenPlaner';
import { OPPFOELGINGSPLANER } from '../menypunkter';

export class OppfoelgingsPlanerOversiktSide extends Component {
    componentWillMount() {
        const { fnr, actions, henterDialoger, hentetDialoger } = this.props;
        if (!henterDialoger && !hentetDialoger) {
            actions.hentOppfoelgingsdialoger(fnr);
        }
    }

    render() {
        const { actions, aktiveDialoger, inaktiveDialoger, ledetekster, henter, hentingFeilet, ikkeTilgang, ikkeTilgangFeilmelding, fnr } = this.props;
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
                    if (aktiveDialoger.length === 0 && inaktiveDialoger.length === 0) {
                        return <IngenPlaner />;
                    }
                    return (<div>
                        <OppfoelgingsPlanerOversikt actions={actions} aktiveDialoger={aktiveDialoger} inaktiveDialoger={inaktiveDialoger} ledetekster={ledetekster} fnr={fnr} />
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
    aktiveDialoger: PropTypes.array,
    inaktiveDialoger: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    henterDialoger: PropTypes.bool,
    hentetDialoger: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, oppdialogActions, virksomhetActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state) {
    const fnr = state.navbruker.data.fnr;
    const henter = state.oppfoelgingsdialoger.henter || state.ledetekster.henter || state.ledere.henter;
    const hentingFeilet = state.oppfoelgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet;
    const hentetDialoger = state.oppfoelgingsdialoger.hentet;
    const henterDialoger = state.oppfoelgingsdialoger.henter;

    const aktiveDialoger = state.oppfoelgingsdialoger.data.filter((dialog) => {
        return dialog.status !== 'AVBRUTT' && new Date(dialog.godkjentPlan.gyldighetstidspunkt.tom) > new Date();
    });

    const inaktiveDialoger = [];
    state.oppfoelgingsdialoger.data.forEach((dialog) => {
        if (!aktiveDialoger.includes(dialog)) {
            inaktiveDialoger.push(dialog);
        }
    });
    return {
        brukernavn: state.navbruker.data.navn,
        fnr,
        henter,
        hentingFeilet,
        hentetDialoger,
        henterDialoger,
        ledetekster: state.ledetekster.data,
        inaktiveDialoger,
        aktiveDialoger,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const OppfoelgingsPlanerOversiktContainer = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsPlanerOversiktSide);
export default OppfoelgingsPlanerOversiktContainer;
