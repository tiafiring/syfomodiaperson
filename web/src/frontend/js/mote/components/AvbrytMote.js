import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import { fikkMoteOpprettetVarsel } from '../utils/index';

const AvbrytMote = ({ ledetekster, deltaker, sykmeldtDeltaker, onSubmit, avbrytHref, avbryter, avbrytFeilet }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">{getLedetekst('mote.avbrytmote.overskrift', ledetekster)}</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-arbeidsgiver', ledetekster)}</h3>
            <p>{deltaker.navn}</p>
        </div>

        { fikkMoteOpprettetVarsel(sykmeldtDeltaker) &&
        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-sykmeldt', ledetekster)}</h3>
            <p>{sykmeldtDeltaker.navn}</p>
        </div>
        }

        <div className="epostinnhold_infoboks">
            <p>{getLedetekst('mote.avbrytmote.informasjon', ledetekster)}</p>
        </div>

        <div aria-live="polite" role="alert">
            { avbrytFeilet && <div className="blokk"><Varselstripe type="feil"><p>{getLedetekst('mote.avbrytmote.feil', ledetekster)}</p></Varselstripe></div>}
        </div>

        <div className="knapperad">
            <button disabled={avbryter} className="knapp blokk--s" onClick={onSubmit}>{getLedetekst('mote.avbrytmote.knapp.submit', ledetekster)}</button>
            <p><Link to={avbrytHref}>{getLedetekst('mote.avbrytmote.knapp.avbryt', ledetekster)}</Link></p>
        </div>
    </div>);
};

AvbrytMote.propTypes = {
    deltaker: PropTypes.object,
    sykmeldtDeltaker: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export default AvbrytMote;
