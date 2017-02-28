import React, { PropTypes, Component } from 'react';
import NaermesteLedere from '../components/NaermesteLedere';
import { getLedetekst } from 'digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Side from '../sider/Side';
import * as ledereActions from '../actions/ledere_actions';
import AppSpinner from '../components/AppSpinner';
import { NAERMESTE_LEDER } from '../menypunkter';

export class NaermesteLedereSide extends Component {
    constructor(props) {
        super(props);
        this.props.actions.hentLedere(this.props.fnr);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.fnr !== this.props.fnr) {
            this.props.actions.hentLedere(nextProps.fnr);
        }
    }

    render() {
        const { henter, ledere, hentingFeilet, actions, navbruker, ikkeTilgang, ledetekster } = this.props;
        return (<Side tittel="Nærmeste ledere" aktivtMenypunkt={NAERMESTE_LEDER}>
        {
            (() => {
                if (hentingFeilet) {
                    return <Feilmelding />;
                } else if (ikkeTilgang) {
                    return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)} melding={getLedetekst('sykefravaer.veileder.feilmelding.melding', ledetekster)} />);
                } else if (henter) {
                    return <AppSpinner />;
                }
                return <NaermesteLedere ledere={ledere} toggleApenLeder={actions.toggleApenLeder} navbruker={navbruker} />;
            })()
        }
        </Side>);
    }
}

NaermesteLedereSide.propTypes = {
    ledere: PropTypes.array,
    toggleApenLeder: PropTypes.func,
    fnr: PropTypes.string,
    actions: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    navbruker: PropTypes.object,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ledereActions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const fnr = ownProps.params.fnr;
    return {
        ledere: state.ledere.data,
        henter: state.ledere.henter || state.navbruker.henter || state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.ledere.hentingFeilet,
        navbruker: state.navbruker.data,
        ikkeTilgang: state.ledere.ikkeTilgang,
        fnr,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps, mapDispatchToProps)(NaermesteLedereSide);

export default NaermesteLedereContainer;
