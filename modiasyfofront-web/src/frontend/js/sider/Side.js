import React, { PropTypes } from 'react';
import NavbrukerinfoContainer from '../containers/NavbrukerinfoContainer';
import GlobalNavigasjonContainer from '../containers/GlobalNavigasjonContainer';

const Side = ({ children }) => {
    return (<div className="container">
        <NavbrukerinfoContainer />
        <div className="grid">
            <nav className="unit one-third">
                <GlobalNavigasjonContainer />
            </nav>
            <div className="unit two-thirds">
                {children}
            </div>
        </div>
    </div>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
};

export default Side;
