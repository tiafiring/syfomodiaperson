import React, { PropTypes } from 'react';
import Navigasjon from '../components/Navigasjon';
import NavBrukerinfoContainer from '../containers/NavBrukerinfoContainer';

const Side = ({ children, fnr }) => {
    return (<div className="container">
        <NavBrukerinfoContainer fnr={fnr} />
        {children}
    </div>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
};

export default Side;
