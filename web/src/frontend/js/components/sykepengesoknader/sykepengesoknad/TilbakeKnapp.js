import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const TilbakeKnapp = ({ fnr, clazz }) => {
    return (<div className={`knapperad ${clazz}`}>
        <Link to={`/sykefravaer/${fnr}/sykepengesoknader`} className="knapp--standard knapp--mini">Tilbake</Link>
    </div>);
};

TilbakeKnapp.propTypes = {
    fnr: PropTypes.string,
    clazz: PropTypes.string,
};

export default TilbakeKnapp;
