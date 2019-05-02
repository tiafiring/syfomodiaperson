import React from 'react';
import PropTypes from 'prop-types';
import { tilLesbarPeriodeMedAarUtenMaanednavn } from '../../utils/datoUtils';
import BoksRad from './BoksRad';

export const PeriodeBoks = (
    {
        periode,
    }) => {
    return (<div className="sykmeldingMotebehovVisning__periodeBoks">
        <BoksRad
            kolonne1Tekst={`${tilLesbarPeriodeMedAarUtenMaanednavn(periode.fom, periode.tom)}`}
            kolonne2Tekst={`${periode.grad}%`}
            erTittel
        />
    </div>);
};

PeriodeBoks.propTypes = {
    periode: PropTypes.object,
};

export const Perioder = (
    {
        perioder,
    }) => {
    return (<div className="sykmeldingMotebehovVisning__perioder">
        <h6 className="sporsmal">Perioder</h6>
        {
            perioder.map((periode, index) => {
                return (<PeriodeBoks key={index} periode={periode} />);
            })
        }
    </div>);
};

Perioder.propTypes = {
    perioder: PropTypes.arrayOf(PropTypes.object),
};

export default Perioder;
