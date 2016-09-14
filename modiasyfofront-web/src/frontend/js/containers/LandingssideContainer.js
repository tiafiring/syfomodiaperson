import React, { PropTypes } from 'react';
import NaermesteLedere from '../components/NaermesteLedere';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import NavBrukerinfo from '../components/NavBrukerinfo';
import * as ledereActions from '../actions/ledere_actions';

export const LandingssideSide = ({ ledere, navBruker, toggleApenLeder }) => {
    return (
        <Side tittel="Sykefravær">
            <NavBrukerinfo {...navBruker} />
            <NaermesteLedere ledere={ledere} navBruker={navBruker} toggleApenLeder={toggleApenLeder} />
        </Side>
    );
};

LandingssideSide.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.object,
};

export function mapStateToProps(state) {
    return {
        ledere: state.ledere.data,
        navBruker: state.navBruker.data,
    };
}

const LandingssideContainer = connect(mapStateToProps, ledereActions)(LandingssideSide);

export default LandingssideContainer;
