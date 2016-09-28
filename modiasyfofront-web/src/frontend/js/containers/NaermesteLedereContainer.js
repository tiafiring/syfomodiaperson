import React, { PropTypes, Component } from 'react';
import NaermesteLedere from '../components/NaermesteLedere';
import Feilmelding from '../components/Feilmelding';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Side from '../sider/Side';
import * as ledereActions from '../actions/ledere_actions';

class NaermesteLedereSide extends Component {
    constructor(props) {
        super(props);
        this.props.actions.hentLedere(this.props.fnr)
    }

    componentWillUpdate(nextProps) {
        if (nextProps.fnr !== this.props.fnr) {
            this.props.actions.hentLedere(nextProps.fnr);
        }
    }

    render() {
        const {  fnr, henter, ledere, hentingFeilet, actions, navBruker } = this.props;
        return (<Side tittel="Sykefravær" fnr={fnr}>
        {
            (() => {
                if (henter) {
                    return <p>Henter</p>;
                } else if (hentingFeilet) {
                    return <Feilmelding />
                } else {
                    return <NaermesteLedere ledere={ledere} toggleApenLeder={actions.toggleApenLeder} navBruker={navBruker} />;
                }
            })()
        }
        </Side>);
    }
}

NaermesteLedereSide.propTypes = {
    ledere: PropTypes.array,
    toggleApenLeder: PropTypes.func,
    fnr: PropTypes.string,
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
        henter: state.ledere.henter,
        hentingFeilet: state.ledere.hentingFeilet,
        navBruker: state.navBruker.data,
        fnr,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps, mapDispatchToProps)(NaermesteLedereSide);

export default NaermesteLedereContainer;
