import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import Tilbakelenke from '../../components/Tilbakelenke';

const LenkeTilDineSykmeldinger = ({ ledetekster, fnr }) => {
    return (<Tilbakelenke to={`/sykefravaer/${fnr}/sykmeldinger`} tekst={getLedetekst('din-sykmelding.tilbake', ledetekster)} />);
};

LenkeTilDineSykmeldinger.propTypes = {
    ledetekster: PropTypes.object,
    fnr: PropTypes.string,
};

export default LenkeTilDineSykmeldinger;
