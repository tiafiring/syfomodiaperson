import React, { PropTypes } from 'react';
import NavbrukerinfoContainer from '../containers/NavbrukerinfoContainer';
import GlobalNavigasjonContainer from '../containers/GlobalNavigasjonContainer';

const Side = ({ children }) => {
    return (<div className="container">
        <NavbrukerinfoContainer />
        <div className="rad">
            <nav className="kolonne">
                <GlobalNavigasjonContainer />
            </nav>
            <div className="kolonne kolonne--3">
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
