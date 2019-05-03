import React from 'react';
import PropTypes from 'prop-types';
import { tilDatoMedUkedagOgManedNavn } from '../utils/datoUtils';
import Sidetopp from '../components/Sidetopp';
import { Link } from 'react-router';

const setTittel = (mote) => {
    if (mote) {
        if (mote.status === 'BEKREFTET') {
            return 'Bekreftet møte';
        }
        return 'Se møtestatus';
    }
    return 'Forespør møte';
};

const setUndertittel = (mote) => {
    if (mote) {
        if (mote.status === 'BEKREFTET' && mote.bekreftetAlternativ) {
            return `Dialogmøte ${tilDatoMedUkedagOgManedNavn(mote.bekreftetAlternativ.tid)}`;
        } else if (mote.opprettetTidspunkt) {
            return `Møteforespørsel sendt ${tilDatoMedUkedagOgManedNavn(mote.opprettetTidspunkt)}`;
        }
    }
    return 'Ingen møter planlagt';
};

export const MotelandingssideMoteElement = (
    {
        fnr,
        mote,
    }
) => {
    const undertittel = setUndertittel(mote);
    const tittel = setTittel(mote);
    return (<li className="motelandingssidepanel">
        <Link
            className="motelandingssidepanel__innhold"
            to={`/sykefravaer/${fnr}/mote`}>
            <img className="motelandingssidepanel__ikon" src="/sykefravaer/img/svg/moteikon_blaabg.svg" alt="moteikon" />
            <div className="motelandingssidepanel__tekst">
                <header className="motelandingssidepanel__tekst--tittel">
                    <h3 className="js-title" id="soknad-header-mote">
                        {tittel}
                    </h3>
                </header>
                <p className="inngangspanel__tekst--undertittel js-tekst">{undertittel}</p>
            </div>
        </Link>
    </li>);
};

MotelandingssideMoteElement.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
};

export const MotelandingssideMotebehovElement = (
    {
        fnr,
    }
) => {
    return (<li className="motelandingssidepanel">
        <Link
            className="motelandingssidepanel__innhold"
            to={`/sykefravaer/${fnr}/motebehov`}>
            <img className="motelandingssidepanel__ikon"
                src="/sykefravaer/img/svg/moteikon_blaabg.svg" alt="moteikon" />
            <div className="motelandingssidepanel__tekst">
                <header className="motelandingssidepanel__tekst--tittel">
                    <h3 className="js-title" id="soknad-header-mote">
                        {'BEHOV FOR DIALOGMØTE'}
                    </h3>
                </header>
                <p className="inngangspanel__tekst--undertittel js-tekst">{'Avklaring om møtebehov'}</p>
            </div>
        </Link>
    </li>);
};

MotelandingssideMotebehovElement.propTypes = {
    fnr: PropTypes.string,
};

export const Motelandingsside = (
    {
        fnr,
        mote,
    }
) => {
    return (<div>
        <Sidetopp tittel={'Dialogmøter'} />
        <ul>
            <MotelandingssideMoteElement
                fnr={fnr}
                mote={mote}
            />
            <MotelandingssideMotebehovElement
                fnr={fnr}
            />
        </ul>
    </div>);
};

Motelandingsside.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
};

export default Motelandingsside;
