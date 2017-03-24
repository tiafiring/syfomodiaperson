import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { konstanter, proptypes as moterPropTypes } from 'moter-npm';
import { fikkMoteOpprettetVarsel } from '../utils';

const Epostmottakere = ({ mote, ledetekster }) => {
    const sykmeldt = mote.deltakere.filter((d) => {
        return d.type === konstanter.BRUKER;
    })[0];
    const arbeidsgiver = mote.deltakere.filter((d) => {
        return d.type === konstanter.ARBEIDSGIVER;
    })[0];

    return (<div className="mottakere">
        <div className="epostinnhold__mottaker js-mottaker blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-arbeidsgiver', ledetekster)}</h3>
            <p>{arbeidsgiver.navn}</p>
        </div>
        { fikkMoteOpprettetVarsel(sykmeldt) && (<div className="epostinnhold__mottaker js-mottaker blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-arbeidstaker', ledetekster)}</h3>
            <p>{sykmeldt.navn}</p>
        </div>) }
    </div>);
};

Epostmottakere.propTypes = {
    mote: moterPropTypes.mote,
    ledetekster: PropTypes.object,
};

export default Epostmottakere;
