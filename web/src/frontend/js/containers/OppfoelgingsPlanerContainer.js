import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst, Varselstripe } from 'digisyfo-npm';
import * as actionCreators from '../actions/oppfoelgingsdialoger_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import { OPPFOELGINGSPLANER } from '../menypunkter';

export class OppfoelgingsPlanerSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        this.props.actions.hentOppfoelgingsdialoger(fnr);
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, ikkeTilgang, fnr, ikkeTilgangFeilmelding } = this.props;
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Dine oppfølgingsplaner',
        }];

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
                        <div className="panel">
                            <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                                <p>Dette er slik {brukernavn} ser det på nav.no</p>
                            </Varselstripe>
                        </div>
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

OppfoelgingsPlanerSide.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    ikkeTilgangFeilmelding: PropTypes.string,
    actions: PropTypes.object,
    oppfoelgingsdialoger: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, actionCreators);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}


export function mapStateToProps(state) {
    const fnr = state.navbruker.data.fnr;
    const henter = state.oppfoelgingsdialoger.henter || state.ledetekster.henter || state.ledere.henter;
    const hentingFeilet = state.oppfoelgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet;
    return {
        brukernavn: state.navbruker.data.navn,
        fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        oppfoelgingsdialoger: state.oppfoelgingsdialoger.data,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const OppfoelgingsPlanerContainer = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsPlanerSide);
export default OppfoelgingsPlanerContainer;
