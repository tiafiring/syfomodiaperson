import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from 'digisyfo-npm';
import { fikkMoteOpprettetVarsel, getTidFraZulu } from '../utils/index';
import { hentDag } from '../../utils/index';

const BekreftMote = ({ deltaker, sykmeldtDeltaker, onSubmit, avbrytHref, alternativ, ledetekster }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">{getLedetekst('mote.bekreftmote.lightbox-overskrift', ledetekster)}</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.bekreftmote.lightbox-tidsted', ledetekster)}</h3>
            <p>{hentDag(alternativ.tid)} {getTidFraZulu(alternativ.tid)}</p>
        </div>

        <div className="epostinnhold__mottakere blokk epostinnhold_avgrensning_bunn">
            <h3>{getLedetekst('mote.bekreftmote.lightbox-motested', ledetekster)}</h3>
            <p>{alternativ.sted}</p>
        </div>

        <h2>{getLedetekst('mote.bekreftmote.lightbox-sendes-til', ledetekster)}</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.bekreftmote.lightbox-arbeidsgiver', ledetekster)}</h3>
            <p>{deltaker.navn}</p>
        </div>

        { fikkMoteOpprettetVarsel(sykmeldtDeltaker) &&
        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.bekreftmote.lightbox-arbeidstaker', ledetekster)}</h3>
            <p>{sykmeldtDeltaker.navn}</p>
        </div>
        }

        <div className="knapperad">
            <button className="knapp blokk--s" onClick={onSubmit}>{getLedetekst('mote.bekreftmote.lightbox-send-knapp', ledetekster)}</button>
            <p><Link to={avbrytHref}>{getLedetekst('mote.bekreftmote.lightbox-avbryt-knapp', ledetekster)}</Link></p>
        </div>
    </div>);
};

BekreftMote.propTypes = {
    deltaker: PropTypes.object,
    sykmeldtDeltaker: PropTypes.object,
    alternativ: PropTypes.object,
    ledetekster: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
};

export default BekreftMote;
