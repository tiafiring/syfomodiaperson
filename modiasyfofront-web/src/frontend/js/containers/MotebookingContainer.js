import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjema from '../mote/skjema/MotebookingSkjema';
import MotebookingStatus from '../mote/skjema/MotebookingStatus';
import * as actionCreators from '../mote/actions/moter_actions';

const MotebookingSide = (props) => {
    return (<Side tittel="Møtebooking">
    {
        (() => {
            if (props.mote) {
                return <MotebookingStatus mote={props.mote} />;
            }
            return <MotebookingSkjema {...props} />;
        })()
    }
    </Side>);
};

MotebookingSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
};

const mapStateToProps = (state) => {
    const fnr = state.navbruker.data.fnr;
    const mote = state.moter.data.filter((m) => {
        return m.fnr === fnr;
    })[0];

    return {
        fnr,
        mote,
        sender: state.moter.sender,
        sendingFeilet: state.moter.sendingFeilet,
    };
};

const MotebookingContainer = connect(mapStateToProps, actionCreators)(MotebookingSide);

export default MotebookingContainer;
