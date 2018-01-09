import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst, Varselstripe } from 'digisyfo-npm';
import { Panel } from 'nav-frontend-paneler';
import Side from '../sider/Side';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import * as actionCreators from '../actions/sykepengesoknader_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import SykepengeSoknad from '../components/sykepengesoknader/sykepengesoknad/SykepengeSoknad';
import IkkeInnsendtSoknad from '../components/sykepengesoknader/sykepengesoknad/IkkeInnsendtSoknad';
import TilbakeKnapp from '../components/sykepengesoknader/sykepengesoknad/TilbakeKnapp';
import Brodsmuler from '../components/Brodsmuler';
import { SYKEPENGESOKNADER } from '../menypunkter';
import { sykepengesoknad as sykepengesoknadPt } from '../propTypes';
import { NY, UTKAST_TIL_KORRIGERING } from '../enums/sykepengesoknadstatuser';

export class SykepengesoknadSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        if (this.props.hentSykepengesoknader) {
            this.props.actions.hentSykepengesoknader(fnr);
        }
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, ikkeTilgang, sykepengesoknad, ikkeTilgangFeilmelding, fnr } = this.props;
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
                    if (ikkeTilgang) {
                        return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (sykepengesoknad.status === NY || sykepengesoknad.status === UTKAST_TIL_KORRIGERING) {
                        return (<div>
                            <IkkeInnsendtSoknad />
                            <TilbakeKnapp clazz="knapperad--tight" fnr={fnr} />
                        </div>);
                    }
                    return (<div>
                        <Panel>
                            <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                                <p>Dette er slik {brukernavn} ser det på nav.no</p>
                            </Varselstripe>
                        </Panel>
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                            <SidetoppSpeilet tittel="Søknad om sykepenger" />
                            <SykepengeSoknad fnr={fnr} sykepengesoknad={sykepengesoknad} />
                            <TilbakeKnapp clazz="knapperad--adskilt" fnr={fnr} />
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
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
}

const SykepengesoknadContainer = connect(mapStateToProps, mapDispatchToProps)(SykepengesoknadSide);
export default SykepengesoknadContainer;
