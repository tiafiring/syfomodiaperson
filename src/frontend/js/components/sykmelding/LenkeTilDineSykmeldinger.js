import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from '@navikt/digisyfo-npm';
import Tilbakelenke from '../Tilbakelenke';

const LenkeTilDineSykmeldinger = ({ ledetekster, fnr }) => {
    return (<Tilbakelenke to={`/sykefravaer/${fnr}/sykmeldinger`} tekst={getLedetekst('din-sykmelding.tilbake', ledetekster)} />);
};

LenkeTilDineSykmeldinger.propTypes = {
    ledetekster: keyValue,
    fnr: PropTypes.string,
};

export default LenkeTilDineSykmeldinger;
