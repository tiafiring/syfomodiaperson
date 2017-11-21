import React, { PropTypes } from 'react';

const Infomelding = ({ tittel, melding }) => {
    return (<div className="panel panel--melding">
        <h3 className="hode hode--info">{tittel}</h3>
        <p>{melding}</p>
    </div>);
};

Infomelding.propTypes = {
    tittel: PropTypes.string,
    melding: PropTypes.string,
};

export default Infomelding;
