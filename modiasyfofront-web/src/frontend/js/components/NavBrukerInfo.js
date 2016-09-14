import React, { PropTypes } from 'react';

const NavBrukerinfo = ({ navn, fnr }) => {
    return (<div className="Panel">
        <h2 className="typo-undertittel">{navn}</h2>
        <p>Personnummer: {fnr}</p>
    </div>);
};

NavBrukerinfo.propTypes = {
    navn: PropTypes.string,
    fnr: PropTypes.string,
};

export default NavBrukerinfo;
