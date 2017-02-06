import React, {PropTypes} from "react";
import {getHtmlLedetekst} from "digisyfo-npm";

const feilAarsakForklaringFunc = (feilAarsak, ledetekster) => {
    switch (feilAarsak) {
        case 'RESERVERT': {
            return <div dangerouslySetInnerHTML={getHtmlLedetekst('motebooking.krr.reservert', ledetekster)}></div>
        }
        case 'INGEN_KONTAKTINFORMASJON': {
            return <div dangerouslySetInnerHTML={getHtmlLedetekst('motebooking.krr.ingen-kontaktinformasjon', ledetekster)}></div>
        }
        default: {
            return <p />;
        }
    }
};

const KontaktInfoFeilmelding = ({feilAarsak, ledetekster}) => {
    const feilAarsakForklaring = feilAarsakForklaringFunc(feilAarsak, ledetekster);
    return (<div className="panel">
        <div className="hode hode-feil">
            { feilAarsakForklaring }
        </div>
    </div>);
};

KontaktInfoFeilmelding.propTypes = {
    feilAarsak: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default KontaktInfoFeilmelding;