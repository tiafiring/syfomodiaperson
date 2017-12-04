import React, { PropTypes } from 'react';
import { getLedetekst, Radiofaner } from 'digisyfo-npm';

const arbeidssituasjoner = (ledetekster) => {
    return [{
        tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver', ledetekster),
        verdi: 'MED_ARBEIDSGIVER',
    }, {
        tittel: getLedetekst('tidslinje.filter.uten-arbeidsgiver', ledetekster),
        verdi: 'UTEN_ARBEIDSGIVER',
        hjelpetekst: {
            tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tittel', ledetekster),
            tekst: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tekst', ledetekster),
        },
    }];
};

const VelgArbeidssituasjon = ({ valgtArbeidssituasjon, endreArbeidssituasjon, ledetekster }) => {
    return (<Radiofaner
        alternativer={arbeidssituasjoner(ledetekster)}
        valgtAlternativ={valgtArbeidssituasjon}
        changeHandler={(verdi) => {
            endreArbeidssituasjon(verdi);
        }}
        radioName="tidslinje-arbeidssituasjon"
        className="blokk-xl" />);
};

VelgArbeidssituasjon.propTypes = {
    arbeidssituasjoner: PropTypes.array,
    valgtArbeidssituasjon: PropTypes.string,
    endreArbeidssituasjon: PropTypes.func,
};

export default VelgArbeidssituasjon;
