import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import * as moterPropTypes from '../../propTypes';
import {
    BRUKER,
    ARBEIDSGIVER,
} from '../../konstanter';

const Epostmottakere = ({ mote, ledetekster, arbeidstaker }) => {
    const sykmeldt = mote.deltakere.filter((d) => {
        return d.type === BRUKER;
    })[0];
    const arbeidsgiver = mote.deltakere.filter((d) => {
        return d.type === ARBEIDSGIVER;
    })[0];

    return (<div className="mottakere">
        <div className="epostinnhold__mottaker js-mottaker blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-arbeidsgiver', ledetekster)}</h3>
            <p>{arbeidsgiver.navn}</p>
        </div>
        { arbeidstaker.kontaktinfo.skalHaVarsel && (<div className="epostinnhold__mottaker js-mottaker blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-arbeidstaker', ledetekster)}</h3>
            <p>{sykmeldt.navn}</p>
        </div>) }
    </div>);
};

Epostmottakere.propTypes = {
    arbeidstaker: PropTypes.object,
    mote: moterPropTypes.motePt,
    ledetekster: PropTypes.object,
};

export default Epostmottakere;
