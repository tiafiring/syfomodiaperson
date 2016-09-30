import React, { PropTypes } from 'react';
import NavbrukerinfoContainer from '../containers/NavbrukerinfoContainer';

const Side = ({ children, fnr }) => {
    return (<div className="container">
        <NavbrukerinfoContainer fnr={fnr} />
        {children}
    </div>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
};

export default Side;
