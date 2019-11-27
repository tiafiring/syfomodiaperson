import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getLedetekst,
    getHtmlLedetekst,
    keyValue,
} from '@navikt/digisyfo-npm';
import Side from '../sider/Side';
import Historikk from '../components/historikk/Historikk';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as historikkActions from '../actions/historikk_actions';
import * as oppfolgingstilfelleperioderActions from '../actions/oppfolgingstilfelleperioder_actions';
import * as ledereActions from '../actions/ledere_actions';
import { HISTORIKK } from '../enums/menypunkter';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';

export class HistorikkSide extends Component {
    constructor(props) {
        super(props);
        if (!props.historikk.henterMoter && !props.historikk.hentetMoter) {
            props.actions.hentHistorikk(this.props.fnr, 'MOTER');
        }
        if (!props.historikk.henterMotebehov && !props.historikk.hentetMotebehov) {
            props.actions.hentHistorikk(this.props.fnr, 'MOTEBEHOV');
        }
        if (!props.historikk.henterOppfoelgingsdialoger && !props.historikk.hentetOppfoelgingsdialoger) {
            props.actions.hentHistorikk(this.props.fnr, 'OPPFOELGINGSDIALOG');
        }

        props.actions.hentLedere(this.props.fnr);
    }

    componentWillReceiveProps(nextProps) {
        const {
            actions,
            fnr,
            ledereData,
        } = nextProps;
        if (ledereData && ledereData.length > 0) {
            actions.hentOppfolgingstilfelleperioder(fnr);
        }
    }

    render() {
        const {
            fnr,
            henter,
            hentingFeilet,
            historikk,
            ledetekster,
            tilgang,
            oppfolgingstilfelleperioder,
        } = this.props;
        return (<Side fnr={fnr} tittel="Historikk" aktivtMenypunkt={HISTORIKK}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)}
                        />);
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return <Historikk oppfolgingstilfelleperioder={oppfolgingstilfelleperioder} historikk={historikk} />;
                })()
            }
        </Side>);
    }
}

HistorikkSide.propTypes = {
    hentLedere: PropTypes.func,
    hentOppfolgingstilfelleperioder: PropTypes.func,
    hentHistorikk: PropTypes.func,
    historikk: PropTypes.object,
    ledetekster: keyValue,
    actions: PropTypes.object,
    fnr: PropTypes.string,
    hentet: PropTypes.bool,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgang: PropTypes.object,
    oppfolgingstilfelleperioder: PropTypes.object,
    ledereData: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, historikkActions, oppfolgingstilfelleperioderActions, ledereActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const oppfolgingstilfelleperioder = state.oppfolgingstilfelleperioder;
    const henterTilfeller = Object.keys(oppfolgingstilfelleperioder).findIndex((orgnummer) => {
        return oppfolgingstilfelleperioder[orgnummer].henter;
    }) !== -1;
    const henter = state.ledetekster.henter || state.tilgang.henter || state.ledere.henter || henterTilfeller;
    return {
        fnr: ownProps.params.fnr,
        oppfolgingstilfelleperioder,
        historikk: state.historikk,
        henter,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.tilgang.hentingFeilet || state.ledere.hentingFeilet,
        tilgang: state.tilgang.data,
        ledereData: state.ledere.data,
    };
};

const HistorikkContainer = connect(mapStateToProps, mapDispatchToProps)(HistorikkSide);

export default HistorikkContainer;
