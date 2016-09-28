import React, { PropTypes } from 'react';
import NaermesteLedere from '../components/NaermesteLedere';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import NavBrukerinfo from '../components/NavBrukerinfo';
import Navigasjon from '../components/Navigasjon';
import * as ledereActions from '../actions/ledere_actions';

export const LandingssideSide = ({ ledere, fnr, toggleApenLeder }) => {
    return (
        <Side tittel="Sykefravær" fnr={fnr}>
            <NaermesteLedere ledere={ledere} toggleApenLeder={toggleApenLeder} />
        </Side>
    );
};

LandingssideSide.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const fnr = ownProps.params.fnr;
    return {
        ledere: state.ledere.data,
        fnr,
    };
}

const LandingssideContainer = connect(mapStateToProps, ledereActions)(LandingssideSide);

export default LandingssideContainer;
