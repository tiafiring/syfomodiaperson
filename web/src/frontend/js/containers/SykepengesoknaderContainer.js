import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst, Varselstripe } from 'digisyfo-npm';
import * as actionCreators from '../actions/sykepengesoknader_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Soknader from '../components/sykepengesoknader/Soknader';
import Brodsmuler from '../components/Brodsmuler';
import { SYKEPENGESOKNADER } from '../menypunkter';
import { sykepengesoknad as sykepengesoknadPt } from '../propTypes';

export class SykepengesoknaderSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        if (this.props.hentSykepengesoknader) {
            this.props.actions.hentSykepengesoknader(fnr);
        }
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, ikkeTilgang, sykepengesoknader, ikkeTilgangFeilmelding, fnr } = this.props;
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Søknader om sykepenger',
        }];

        return (<Side fnr={fnr} tittel="Sykepengesøknader" aktivtMenypunkt={SYKEPENGESOKNADER}>
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
                            <Soknader sykepengesoknader={sykepengesoknader} fnr={fnr} />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

SykepengesoknaderSide.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    ikkeTilgangFeilmelding: PropTypes.string,
    actions: PropTypes.object,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
    hentSykepengesoknader: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, actionCreators);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const henter = state.sykepengesoknader.henter || state.ledetekster.henter || state.ledere.henter;
    const hentingFeilet = state.sykepengesoknader.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet;
    const hentSykepengesoknader = !state.sykepengesoknader.henter && !state.sykepengesoknader.hentingFeilet && !state.sykepengesoknader.hentet;

    return {
        hentSykepengesoknader,
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        sykepengesoknader: state.sykepengesoknader.data,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const SykepengesoknaderContainer = connect(mapStateToProps, mapDispatchToProps)(SykepengesoknaderSide);
export default SykepengesoknaderContainer;
