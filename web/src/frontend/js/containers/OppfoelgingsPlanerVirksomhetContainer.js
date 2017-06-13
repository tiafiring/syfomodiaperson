import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst, Varselstripe } from 'digisyfo-npm';
import * as oppdialogActions from '../actions/oppfoelgingsdialoger_actions';
import * as sykmeldingerActions from '../actions/sykmeldinger_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsgiverOversikt from '../components/oppfoelgingsdialoger/ArbeidsgiverOversikt';
import { OPPFOELGINGSPLANER } from '../menypunkter';

export class OppfoelgingsPlanerVirksomhetSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        this.props.actions.hentOppfoelgingsdialoger(fnr);
        this.props.actions.hentSykmeldinger(fnr);
    }

    render() {
        const { sykmeldinger, oppfoelgingsdialoger, ledetekster, henter, hentingFeilet, ikkeTilgang, fnr, ikkeTilgangFeilmelding } = this.props;

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
                        <ArbeidsgiverOversikt sykmeldinger={sykmeldinger} oppfoelgingsdialoger={oppfoelgingsdialoger} ledetekster={ledetekster} fnr={fnr} />
                    </div>);
                })()
            }
        </Side>);
    }
}

OppfoelgingsPlanerVirksomhetSide.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    ikkeTilgangFeilmelding: PropTypes.string,
    actions: PropTypes.object,
    oppfoelgingsdialoger: PropTypes.array,
    sykmeldinger: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, oppdialogActions, sykmeldingerActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const fnr = state.navbruker.data.fnr;
    const henter = state.oppfoelgingsdialoger.henter || state.ledetekster.henter || state.ledere.henter || state.sykmeldinger.henter;
    const hentingFeilet = state.oppfoelgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet || state.sykmeldinger.hentingFeilet;
    let oppfoelgingsdialoger = state.oppfoelgingsdialoger.data.filter((oppfoelgingsdialog) => {
        return oppfoelgingsdialog.virksomhetsnummer === ownProps.params.virksomhetsnummer;
    });
    let sykmeldinger = state.sykmeldinger.data.filter((sykmelding) => {
        return sykmelding.orgnummer === ownProps.params.virksomhetsnummer;
    });
    return {
        brukernavn: state.navbruker.data.navn,
        fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        oppfoelgingsdialoger,
        sykmeldinger,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const OppfoelgingsPlanerVirksomhetContainer = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsPlanerVirksomhetSide);
export default OppfoelgingsPlanerVirksomhetContainer;
