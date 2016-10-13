import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';

const Motebooking = ({ fnr }) => {
    return (<Side tittel="Møtebooking">
        <p>Her er litt møtebooking for {fnr}</p>
    </Side>);
};

Motebooking.propTypes = {
    fnr: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        fnr: state.navbruker.data.fnr,
    };
};

const MotebookingContainer = connect(mapStateToProps)(Motebooking);

export default MotebookingContainer;
