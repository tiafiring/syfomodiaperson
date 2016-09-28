import React, { Component } from 'react';
import { connect } from 'react-redux';
import Brukerinfo from '../components/Brukerinfo';
import { bindActionCreators } from 'redux';
import * as navbrukerActions from '../actions/navbruker_actions';

class BrukerinfoContainer extends Component {
    constructor(props) {
        super(props);
        this.props.actions.hentNavbruker(this.props.fnr);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.fnr !== this.props.fnr) {
            this.props.actions.hentNavbruker(nextProps.fnr);
        }
    }

    render() {
        return <Brukerinfo {...this.props} />
    }
}

export function mapStateToProps(state, ownProps) {
    return {
        navBruker: state.navBruker.data,
        fnr: ownProps.fnr,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navbrukerActions, dispatch),
    };
}

const NavBrukerinfoContainer = connect(mapStateToProps, mapDispatchToProps)(BrukerinfoContainer);

export default NavBrukerinfoContainer;
