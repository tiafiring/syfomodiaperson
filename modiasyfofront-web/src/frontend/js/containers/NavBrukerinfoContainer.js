import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavBrukerinfo from '../components/NavBrukerinfo';

export function mapStateToProps(state) {
    return {
        navBruker: state.navBruker.data,
    };
}

const NavBrukerinfoContainer = connect(mapStateToProps)(NavBrukerinfo);

export default NavBrukerinfoContainer;
