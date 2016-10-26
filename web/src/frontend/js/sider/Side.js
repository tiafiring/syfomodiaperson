import React, { PropTypes } from 'react';
import NavbrukerinfoContainer from '../containers/NavbrukerinfoContainer';
import GlobalNavigasjonContainer from '../containers/GlobalNavigasjonContainer';
const DocumentTitle = require('react-document-title');

const Side = ({ tittel, children }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
        <div className="container">
            <NavbrukerinfoContainer />
            <div className="grid">
                <nav className="unit one-third">
                    <GlobalNavigasjonContainer />
                </nav>
                <div className="unit two-thirds">
                    {children}
                </div>
            </div>
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
};

export default Side;
