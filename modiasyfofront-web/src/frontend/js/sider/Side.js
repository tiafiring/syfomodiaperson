import React, { PropTypes } from 'react';
import Navigasjon from '../components/Navigasjon';
import NavBrukerinfoContainer from '../containers/NavBrukerinfoContainer';

const Side = ({ children, fnr }) => {
    return <div className="container">
        <NavBrukerinfoContainer fnr={fnr} />
        <Navigasjon />
        <div>{children}</div>
    </div>;
};

Side.propTypes = {
    children: PropTypes.array,
};

export default Side;
