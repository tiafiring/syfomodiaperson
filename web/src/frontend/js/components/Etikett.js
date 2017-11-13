import React, { PropTypes } from 'react';

const Etikett = ({ tekst, variant }) => {
    return (<span className={`etikett ${variant}`}>
        {tekst}
    </span>);
};

Etikett.propTypes = {
    tekst: PropTypes.string,
    variant: PropTypes.string,
};

export default Etikett;
