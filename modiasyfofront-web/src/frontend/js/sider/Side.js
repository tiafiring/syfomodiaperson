import React, { PropTypes } from 'react';
import Navigasjon from '../components/Navigasjon';
import NavBrukerinfoContainer from '../containers/NavBrukerinfoContainer';

const Side = ({ children }) => {
    return <div className="container">
        <NavBrukerinfoContainer />
        <Navigasjon />
        <div>{children}</div>
    </div>;
};

Side.propTypes = {
    children: PropTypes.array,
};

export default Side;
