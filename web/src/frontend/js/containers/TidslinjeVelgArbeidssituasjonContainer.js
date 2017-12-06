import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import Radiofaner from '../Radiofaner';

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
    ledetekster: PropTypes.object,
    arbeidssituasjoner: PropTypes.array,
    valgtArbeidssituasjon: PropTypes.string,
    endreArbeidssituasjon: PropTypes.func,
};

export default VelgArbeidssituasjon;
