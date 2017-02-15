import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import AppSpinner from '../../components/AppSpinner';
import { fikkMoteOpprettetVarsel } from '../utils/index';

const AvbrytMote = ({ ledetekster, henterInnhold, arbeidsgiver, sykmeldt, onSubmit, avbrytHref, avbryter, avbrytFeilet, varselinnhold, valgtDeltaker = arbeidsgiver, valgtKanal = 'EPOST', hentAvbrytMoteEpostinnhold, setValgtDeltaker }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">{getLedetekst('mote.avbrytmote.overskrift', ledetekster)}</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-arbeidsgiver', ledetekster)}</h3>
            <p>{arbeidsgiver.navn}</p>
        </div>

        { fikkMoteOpprettetVarsel(sykmeldt) &&
        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.avbrytmote.sendes-til-sykmeldt', ledetekster)}</h3>
            <p>{sykmeldt.navn}</p>
        </div>
        }

        <p>{getLedetekst('mote.avbrytmote.informasjon', ledetekster)}</p>
        <div aria-live="polite" role="alert">
            { avbrytFeilet && <div className="blokk"><Varselstripe type="feil"><p>{getLedetekst('mote.avbrytmote.feil', ledetekster)}</p></Varselstripe></div>}
        </div>

        <div className="knapperad">
            <button disabled={avbryter} className="knapp blokk--s luft__right" onClick={onSubmit}>{getLedetekst('mote.avbrytmote.knapp.submit', ledetekster)}</button>
            <Link to={avbrytHref}>{getLedetekst('mote.avbrytmote.knapp.avbryt', ledetekster)}</Link>
        </div>
    </div>);
};

AvbrytMote.propTypes = {
    arbeidsgiver: PropTypes.object,
    sykmeldt: PropTypes.object,
    varselinnhold: PropTypes.object,
    valgtDeltaker: PropTypes.object,
    valgtKanal: PropTypes.string,
    onSubmit: PropTypes.func,
    setValgtDeltaker: PropTypes.func,
    setValgtKanal: PropTypes.func,
    hentAvbrytMoteEpostinnhold: PropTypes.func,
    avbrytHref: PropTypes.string,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
    henterInnhold: PropTypes.bool,
};

export default AvbrytMote;
