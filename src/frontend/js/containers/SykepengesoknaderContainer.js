import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import * as actionCreators from '../actions/sykepengesoknader_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Soknader from '../components/sykepengesoknader/Soknader';
import Brodsmuler from '../components/Brodsmuler';
import { SYKEPENGESOKNADER } from '../menypunkter';
import { sykepengesoknad as sykepengesoknadPt } from '../propTypes';
import Speilingvarsel from '../components/Speilingvarsel';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';

export class SykepengesoknaderSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        if (this.props.hentSykepengesoknader) {
            this.props.actions.hentSykepengesoknader(fnr);
        }
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, tilgang, sykepengesoknader, fnr } = this.props;
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
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<div>
                        <Speilingvarsel brukernavn={brukernavn} />
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
    actions: PropTypes.object,
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgang: PropTypes.object,
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
    const henter = state.sykepengesoknader.henter || state.ledetekster.henter || state.tilgang.henter;
    const hentingFeilet = state.sykepengesoknader.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet;
    const hentSykepengesoknader = !state.sykepengesoknader.henter && !state.sykepengesoknader.hentingFeilet && !state.sykepengesoknader.hentet;

    return {
        hentSykepengesoknader,
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        sykepengesoknader: state.sykepengesoknader.data,
        tilgang: state.tilgang.data,
    };
}

const SykepengesoknaderContainer = connect(mapStateToProps, mapDispatchToProps)(SykepengesoknaderSide);
export default SykepengesoknaderContainer;
