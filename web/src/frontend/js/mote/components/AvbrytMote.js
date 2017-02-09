import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Varselstripe } from 'digisyfo-npm';
import { fikkMoteOpprettetVarsel } from '../utils/index';

const AvbrytMote = ({ arbeidsgiver, sykmeldt, onSubmit, avbrytHref, avbryter, avbrytFeilet, innhold, valgtDeltaker, valgtKanal, hentAvbrytMoteEpostinnhold, setValgtDeltaker, setValgtKanal }) => {
    const sykmeldtValgt = sykmeldt === valgtDeltaker ? 'epostinnhold__valgt' : 'epostinnhold__ikke-valgt';
    const arbeidsgiverValgt = arbeidsgiver === valgtDeltaker ? 'epostinnhold__valgt' : 'epostinnhold__ikke-valgt';
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">Avbryt møteresultat</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til arbeidsgiver</h3>
            <p>{arbeidsgiver.navn}</p>
        </div>

        { fikkMoteOpprettetVarsel(sykmeldt) &&
        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til sykmeldt</h3>
            <p>{sykmeldt.navn}</p>
        </div>
        }

        <h2>Informasjon som sendes til partene</h2>

        <div className="epostinnhold__deltakere">
            <a href="#" className={`epostinnhold_deltakerlenke ${arbeidsgiverValgt}`} onClick={() => {
                setValgtDeltaker(arbeidsgiver);
                hentAvbrytMoteEpostinnhold(arbeidsgiver.deltakerUuid);
            }}>Arbeidsgiver</a>
            <a href="#" className={`epostinnhold_deltakerlenke ${sykmeldtValgt}`} onClick={() => {
                setValgtDeltaker(sykmeldt);
                hentAvbrytMoteEpostinnhold(sykmeldt.deltakerUuid);
            }}>Sykmeldt</a>
        </div>

        <div className="epostinnhold_infoboks">
            <p>{innhold.emne}</p>
        </div>

        <div className="epostinnhold_infoboks">
            <div dangerouslySetInnerHTML={{ __html: innhold.innhold }}></div>
        </div>

        <div aria-live="polite" role="alert">
            { avbrytFeilet && <div className="blokk"><Varselstripe type="feil"><p>Beklager, det oppstod en feil. Prøv igjen litt senere.</p></Varselstripe></div>}
        </div>

        <div className="knapperad">
            <button disabled={avbryter} className="knapp blokk--s" onClick={onSubmit}>Send</button>
            <p><Link to={avbrytHref}>Avbryt</Link></p>
        </div>
    </div>);
};

AvbrytMote.propTypes = {
    arbeidsgiver: PropTypes.object,
    sykmeldt: PropTypes.object,
    innhold: PropTypes.object,
    valgtDeltaker: PropTypes.object,
    valgtKanal: PropTypes.string,
    onSubmit: PropTypes.func,
    setValgtDeltaker: PropTypes.func,
    setValgtKanal: PropTypes.func,
    hentAvbrytMoteEpostinnhold: PropTypes.func,
    avbrytHref: PropTypes.string,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export default AvbrytMote;
