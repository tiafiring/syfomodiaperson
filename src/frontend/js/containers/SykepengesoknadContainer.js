import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import * as actionCreators from '../actions/sykepengesoknader_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import SykepengeSoknad from '../components/sykepengesoknader/sykepengesoknad/SykepengeSoknad';
import IkkeInnsendtSoknad from '../components/sykepengesoknader/sykepengesoknad/IkkeInnsendtSoknad';
import Brodsmuler from '../components/Brodsmuler';
import { SYKEPENGESOKNADER } from '../menypunkter';
import { sykepengesoknad as sykepengesoknadPt } from '../propTypes';
import { NY, UTKAST_TIL_KORRIGERING } from '../enums/sykepengesoknadstatuser';
import Speilingvarsel from '../components/Speilingvarsel';
import Tilbakelenke from '../components/Tilbakelenke';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';

export class SykepengesoknadSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        if (this.props.hentSykepengesoknader) {
            this.props.actions.hentSykepengesoknader(fnr);
        }
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, tilgang, sykepengesoknad, fnr } = this.props;
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Søknad om sykepenger',
        }];

        return (<Side fnr={fnr} tittel="Sykepengesøknader" aktivtMenypunkt={SYKEPENGESOKNADER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)} />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (sykepengesoknad.status === NY || sykepengesoknad.status === UTKAST_TIL_KORRIGERING) {
                        return (<div>
                            <div className="blokk">
                                <IkkeInnsendtSoknad />
                            </div>
                            <Tilbakelenke to={`/sykefravaer/${fnr}/sykepengesoknader`} tekst="Gå til sykepengesøknader" />
                        </div>);
                    }
                    return (<div>
                        <Speilingvarsel brukernavn={brukernavn} />
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                            <SidetoppSpeilet tittel="Søknad om sykepenger" />
                            <div className="blokk">
                                <SykepengeSoknad fnr={fnr} sykepengesoknad={sykepengesoknad} />
                            </div>
                            <Tilbakelenke to={`/sykefravaer/${fnr}/sykepengesoknader`} tekst="Gå til sykepengesøknader" />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

SykepengesoknadSide.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    ikkeTilgangFeilmelding: PropTypes.string,
    actions: PropTypes.object,
    sykepengesoknader: PropTypes.array,
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
    const sykepengesoknad = state.sykepengesoknader.data.filter((soknad) => { return soknad.id === ownProps.params.sykepengesoknadId; })[0];
    const hentSykepengesoknader = !state.sykepengesoknader.henter && !state.sykepengesoknader.hentingFeilet && !state.sykepengesoknader.hentet;
    return {
        hentSykepengesoknader,
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        sykepengesoknad,
        tilgang: state.tilgang.tilgang,
    };
}

const SykepengesoknadContainer = connect(mapStateToProps, mapDispatchToProps)(SykepengesoknadSide);
export default SykepengesoknadContainer;
