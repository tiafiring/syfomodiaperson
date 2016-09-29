import React, { PropTypes } from 'react';
import NaermesteLedere from '../components/NaermesteLedere';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import * as ledereActions from '../actions/ledere_actions';

export const NaermesteLedereSide = ({ ledere, fnr, toggleApenLeder }) => {
    return (
        <Side tittel="Sykefravær" fnr={fnr}>
            <NaermesteLedere ledere={ledere} toggleApenLeder={toggleApenLeder} />
        </Side>
    );
};

NaermesteLedereSide.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
    fnr: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const fnr = ownProps.params.fnr;
    return {
        ledere: state.ledere.data,
        fnr,
    };
}

const NaermesteLedereContainer = connect(mapStateToProps, ledereActions)(NaermesteLedereSide);

export default NaermesteLedereContainer;
