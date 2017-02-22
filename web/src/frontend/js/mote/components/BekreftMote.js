import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from 'digisyfo-npm';
import { fikkMoteOpprettetVarsel, getTidFraZulu } from '../utils/index';
import AppSpinner from '../../components/AppSpinner';

import { hentDag } from '../../utils/index';

const BekreftMote = ({ deltaker, sykmeldt, arbeidsgiver, onSubmit, avbrytHref, alternativ, ledetekster, henterInnhold, setValgtKanal, setValgtDeltaker, hentBekreftMoteEpostinnhold, varselinnhold, valgtDeltaker, valgtKanal }) => {
    const sykmeldtValgt = sykmeldt.deltakerUuid === valgtDeltaker.deltakerUuid ? 'epostinnhold__valgt' : 'epostinnhold__ikke-valgt';
    const arbeidsgiverValgt = arbeidsgiver.deltakerUuid === valgtDeltaker.deltakerUuid ? 'epostinnhold__valgt' : 'epostinnhold__ikke-valgt';

    let innhold;
    if (henterInnhold) {
        innhold = <AppSpinner />;
    } else {
        innhold = (<div>
            {varselinnhold.emne && <div className="epostinnhold_infoboks">
                <p>{varselinnhold.emne}</p>
            </div>
            }
            <div className="epostinnhold_infoboks">
                <div dangerouslySetInnerHTML={{ __html: varselinnhold.innhold }}></div>
            </div>
        </div>);
    }


    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">{getLedetekst('mote.bekreftmote.lightbox-overskrift', ledetekster)}</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.bekreftmote.lightbox-arbeidsgiver', ledetekster)}</h3>
            <p>{deltaker.navn}</p>
            <p>{getLedetekst('mote.bekreftmote.sendes-som-til-arbeidsgiver', ledetekster)}</p>
        </div>

        { fikkMoteOpprettetVarsel(sykmeldt) &&
        <div className="epostinnhold__mottakere blokk">
            <h3>{getLedetekst('mote.bekreftmote.lightbox-arbeidstaker', ledetekster)}</h3>
            <p>{sykmeldt.navn}</p>
            <p>{getLedetekst('mote.bekreftmote.sendes-som-til-sykmeldt', ledetekster)}</p>
        </div>
        }

        <h3>{getLedetekst('mote.bekreftmote.informasjon.sendes.til.partene', ledetekster)}</h3>
        <div className="epostinnhold__deltakere">
            <button className={`epostinnhold__knapp tekst-knapp ${arbeidsgiverValgt}`} onClick={() => {
                setValgtDeltaker(arbeidsgiver);
                hentBekreftMoteEpostinnhold(arbeidsgiver.deltakerUuid, valgtKanal, alternativ.id);
            }}>{getLedetekst('mote.avbrytmote.arbeidsgiver', ledetekster)}</button>
            <button className={`epostinnhold__knapp tekst-knapp ${sykmeldtValgt}`} onClick={() => {
                setValgtDeltaker(sykmeldt);
                hentBekreftMoteEpostinnhold(sykmeldt.deltakerUuid, valgtKanal, alternativ.id);
            }}>{getLedetekst('mote.avbrytmote.sykmeldt', ledetekster)}</button>
        </div>

        {innhold}

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
