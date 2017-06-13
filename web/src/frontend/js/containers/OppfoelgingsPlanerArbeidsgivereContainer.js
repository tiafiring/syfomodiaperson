import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import * as oppdialogActions from '../actions/oppfoelgingsdialoger_actions';
import * as sykmeldingerActions from '../actions/sykmeldinger_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Arbeidsgivere from '../components/oppfoelgingsdialoger/Arbeidsgivere';
import { OPPFOELGINGSPLANER } from '../menypunkter';

export class OppfoelgingsPlanerArbeidsgivereSide extends Component {
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
                        <Arbeidsgivere sykmeldinger={sykmeldinger} oppfoelgingsdialoger={oppfoelgingsdialoger} ledetekster={ledetekster} fnr={fnr} />
                    </div>);
                })()
            }
        </Side>);
    }
}

OppfoelgingsPlanerArbeidsgivereSide.propTypes = {
    fnr: PropTypes.string,
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


export function mapStateToProps(state) {
    const fnr = state.navbruker.data.fnr;
    const henter = state.oppfoelgingsdialoger.henter || state.ledetekster.henter || state.ledere.henter || state.sykmeldinger.henter;
    const hentingFeilet = state.oppfoelgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet || state.sykmeldinger.hentingFeilet;
    return {
        brukernavn: state.navbruker.data.navn,
        fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        oppfoelgingsdialoger: state.oppfoelgingsdialoger.data,
        sykmeldinger: state.sykmeldinger.data,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const OppfoelgingsPlanerArbeidsgivereContainer = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsPlanerArbeidsgivereSide);
export default OppfoelgingsPlanerArbeidsgivereContainer;
