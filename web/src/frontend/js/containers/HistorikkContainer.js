import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Historikk from '../components/historikk/Historikk';
import { bindActionCreators } from 'redux';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import * as historikkActions from '../actions/historikk_actions';
import * as sykeforloepActions from '../actions/sykeforloep_actions';
import { HISTORIKK } from '../menypunkter';

export class HistorikkSide extends Component {
    constructor(props) {
        super(props);
        if (!props.historikk.henterMoter && !props.historikk.hentetMoter) {
            props.actions.hentHistorikk(this.props.fnr, 'MOTER');
        }
        if (!props.historikk.henterOppfoelgingsdialoger && !props.historikk.hentetOppfoelgingsdialoger) {
            props.actions.hentHistorikk(this.props.fnr, 'OPPFOELGINGSDIALOG');
        }
        if (!props.sykeforloep.henter && !props.sykeforloep.hentet) {
            props.actions.hentSykeforloep(this.props.fnr);
        }
    }

    render() {
        const { henter, hentingFeilet, ikkeTilgang, ikkeTilgangFeilmelding, ledetekster, historikk, sykeforloep } = this.props;
        return (<Side tittel="Historikk" aktivtMenypunkt={HISTORIKK}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (ikkeTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return <Historikk sykeforloep={sykeforloep} historikk={historikk} />;
                })()
            }
        </Side>);
    }
}

HistorikkSide.propTypes = {
    hentSykeforloep: PropTypes.func,
    hentHistorikk: PropTypes.func,
    historikk: PropTypes.object,
    sykeforloep: PropTypes.array,
    ledetekster: PropTypes.object,
    actions: PropTypes.object,
    fnr: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ikkeTilgangFeilmelding: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, historikkActions, sykeforloepActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const fnr = ownProps.params.fnr;

    return {
        fnr,
        sykeforloep: state.sykeforloep.data,
        historikk: state.historikk,
        henter: state.sykeforloep.henter,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.sykeforloep.hentingFeilet,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
};

const HistorikkContainer = connect(mapStateToProps, mapDispatchToProps)(HistorikkSide);

export default HistorikkContainer;
