import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import PropTypes from 'prop-types';

const Speilingvarsel = ({ brukernavn }) => {
    return (<Alertstripe type="info" className="blokk--s">
        <p>Dette er slik {brukernavn} ser det på nav.no</p>
    </Alertstripe>);
};

Speilingvarsel.propTypes = {
    brukernavn: PropTypes.string,
};

export default Speilingvarsel;
