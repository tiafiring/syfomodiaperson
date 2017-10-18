import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Historikk from '../components/historikk/Historikk';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import * as actions from '../actions/historikk_actions';
import { HISTORIKK } from '../menypunkter';

export class HistorikkSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentHistorikk(this.props.fnr);
    }

    render() {
        const { henter, hentingFeilet, ikkeTilgang, ikkeTilgangFeilmelding, ledetekster, historikk } = this.props;
        return (<Side tittel="Historikk" aktivtMenypunkt={HISTORIKK}>
            {
                (() => {
                    if (ikkeTilgang) {
                        return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                                             melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (henter) {
                        return <AppSpinner />;
                    }
                    return <Historikk historikk={historikk} />;
                })()
            }
        </Side>);
    }
}

HistorikkSide.propTypes = {
    historikk: PropTypes.array,
    ledetekster: PropTypes.object,
    fnr: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ikkeTilgangFeilmelding: PropTypes.string,
};

export const mapStateToProps = (state) => {
    const fnr = state.navbruker.data.fnr;

    return {
        fnr,
        historikk: state.historikk.data,
        henter: state.historikk.data.length === 0,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.historikk.hentingFeilet,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
    };
};

const HistorikkContainer = connect(mapStateToProps, actions)(HistorikkSide);

export default HistorikkContainer;
