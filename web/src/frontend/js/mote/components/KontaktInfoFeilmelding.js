import React, { PropTypes } from 'react';
import { getHtmlLedetekst } from 'digisyfo-npm';

const KontaktInfoFeilmelding = ({ feilmeldingkey, ledetekster }) => {
    return (<div className="panel">
        <div className="hode hode-feil" dangerouslySetInnerHTML={getHtmlLedetekst(feilmeldingkey, ledetekster)}>
        </div>
    </div>);
};

KontaktInfoFeilmelding.propTypes = {
    feilmeldingkey: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default KontaktInfoFeilmelding;
