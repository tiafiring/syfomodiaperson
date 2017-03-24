import React, { PropTypes } from 'react';
import { Varselstripe } from 'digisyfo-npm';

const KontaktInfoFeilmelding = ({ melding }) => {
    return (<div className="panel">
        <Varselstripe type="feil">
            <div dangerouslySetInnerHTML={melding} />
        </Varselstripe>
    </div>);
};

KontaktInfoFeilmelding.propTypes = {
    melding: PropTypes.object,
};

export default KontaktInfoFeilmelding;
