import React from 'react';
import PropTypes from 'prop-types';
import ArbeidsgiverDropdown from './ArbeidsgiverDropdown';
import { getLedetekst } from 'digisyfo-npm';

const ValgtLeder = ({ valgtArbeidsgiver, ledetekster }) => {
    return (<div>
        <div className="navInput blokk">
            <label htmlFor="js-ledernavn">{getLedetekst('mote.bookingskjema.lederfields.ledernavn', ledetekster)}</label>
            <label className="input--xxl textfieldLocked">{valgtArbeidsgiver.navn}</label>
        </div>
        <div className="navInput blokk ">
            <label htmlFor="js-lederepost">{getLedetekst('mote.bookingskjema.lederfields.epost', ledetekster)}</label>
            <label className="input--xxl textfieldLocked">{valgtArbeidsgiver.epost}</label>
        </div>
    </div>);
};

ValgtLeder.propTypes = {
    ledetekster: PropTypes.object,
    valgtArbeidsgiver: PropTypes.object,
};

const VelgLeder = ({ ledetekster, ledere, valgtArbeidsgiver, velgArbeidsgiver }) => {
    const valgtLeder = ledere.filter((leder) => {
        return leder.orgnummer === valgtArbeidsgiver;
    })[0] || null;
    return (<div>
        <ArbeidsgiverDropdown velgArbeidsgiver={velgArbeidsgiver} ledere={ledere} ledetekster={ledetekster} />
        { valgtArbeidsgiver !== 'VELG' && <ValgtLeder valgtArbeidsgiver={valgtLeder} ledetekster={ledetekster} />}
    </div>);
};

VelgLeder.propTypes = {
    velgArbeidsgiver: PropTypes.func,
    valgtArbeidsgiver: PropTypes.string,
    ledetekster: PropTypes.object,
    ledere: PropTypes.array,
};

export default VelgLeder;
