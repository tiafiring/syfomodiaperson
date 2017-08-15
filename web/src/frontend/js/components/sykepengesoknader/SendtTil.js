import React from 'react';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';

const SendtTil = ({ sykepengesoknad }) => {
    if (sykepengesoknad.sendtTilArbeidsgiverDato && sykepengesoknad.sendtTilNAVDato && sykepengesoknad.sendtTilArbeidsgiverDato.getTime() === sykepengesoknad.sendtTilNAVDato.getTime()) {
        return (<label>{getLedetekst('modia.soknad.teaser.sendttil--begge', {
            '%NAVN%': sykepengesoknad.arbeidsgiver.navn,
            '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilArbeidsgiverDato),
        }) }</label>);
    }
    return (<div>
        {
            sykepengesoknad.sendtTilArbeidsgiverDato && <label>{getLedetekst('modia.soknad.teaser.sendttil', {
                '%NAVN%': sykepengesoknad.arbeidsgiver.navn,
                '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilArbeidsgiverDato),
            }) }</label>
        }
        {
            sykepengesoknad.sendtTilNAVDato && <label>{getLedetekst('modia.soknad.teaser.sendttil', {
                '%NAVN%': 'NAV',
                '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilNAVDato),
            }) }</label>
        }
    </div>);
};

SendtTil.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtTil;
