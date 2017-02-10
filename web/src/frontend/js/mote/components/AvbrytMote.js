import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Varselstripe } from 'digisyfo-npm';
import AppSpinner from '../../components/AppSpinner';
import { fikkMoteOpprettetVarsel } from '../utils/index';

const AvbrytMote = ({ henterInnhold, arbeidsgiver, sykmeldt, onSubmit, avbrytHref, avbryter, avbrytFeilet, varselinnhold, valgtDeltaker = arbeidsgiver, valgtKanal = 'EPOST', hentAvbrytMoteEpostinnhold, setValgtDeltaker }) => {
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
            <button className={`epostinnhold__knapp tekst-knapp ${arbeidsgiverValgt}`} onClick={() => {
                setValgtDeltaker(arbeidsgiver);
                hentAvbrytMoteEpostinnhold(arbeidsgiver.deltakerUuid, valgtKanal);
            }}>Arbeidsgiver</button>
            <button className={`epostinnhold__knapp tekst-knapp ${sykmeldtValgt}`} onClick={() => {
                setValgtDeltaker(sykmeldt);
                hentAvbrytMoteEpostinnhold(sykmeldt.deltakerUuid, valgtKanal);
            }}>Sykmeldt</button>
        </div>

        {innhold}

        <div aria-live="polite" role="alert">
            { avbrytFeilet && <div className="blokk"><Varselstripe type="feil"><p>Beklager, det oppstod en feil. Prøv igjen litt senere.</p></Varselstripe></div>}
        </div>

        <div>
            <button disabled={avbryter} className="knapp blokk--s luft__right" onClick={onSubmit}>Send</button>
            <Link to={avbrytHref}>Avbryt</Link>
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
