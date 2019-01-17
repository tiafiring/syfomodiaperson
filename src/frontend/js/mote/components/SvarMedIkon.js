import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    motedeltakerPt,
    motesvarPt,
} from '../../propTypes';
import { getSvar } from '../../utils/moteplanleggerUtils';
import { ARBEIDSGIVER, MULIGE_SVAR } from '../../konstanter';

const getIkonsti = (filnavn) => {
    return `/sykefravaer/img/svg/${filnavn}`;
};

const Ikon = ({ ikon }) => {
    return (<div className="alternativsvar__ikon">
        <img src={getIkonsti(ikon)} className="js-ikon-passer" alt="" />
    </div>);
};

Ikon.propTypes = {
    ikon: PropTypes.string.isRequired,
};

const getSvartekst = (bruker, svar, ledetekster) => {
    const svarstr = getSvar(svar, bruker.svartidspunkt);
    switch (svarstr) {
        case MULIGE_SVAR.PASSER: {
            return getLedetekst('mote.svar.status.kan-mote', ledetekster, {
                '%NAVN%': bruker.navn,
            });
        }
        case MULIGE_SVAR.PASSER_IKKE: {
            return getLedetekst('mote.svar.status.kan-ikke-mote', ledetekster, {
                '%NAVN%': bruker.navn,
            });
        }
        default: {
            return getLedetekst('mote.svar.status.ikke-svart', ledetekster, {
                '%NAVN%': bruker.navn,
            });
        }
    }
};

const getIkonFilnavn = (bruker, svar) => {
    const svarstr = getSvar(svar, bruker.svartidspunkt);
    switch (svarstr) {
        case MULIGE_SVAR.PASSER: {
            return 'status--kan.svg';
        }
        case MULIGE_SVAR.PASSER_IKKE: {
            return 'status--kanikke.svg';
        }
        default: {
            return 'status--ikkesvar.svg';
        }
    }
};

const Svartekst = ({ tekst, deltakertype }) => {
    return (<div className="alternativsvar__tekst">
        <p><span className="alternativsvar__deltakertype">{deltakertype}:</span> {tekst}</p>
    </div>);
};

Svartekst.propTypes = {
    tekst: PropTypes.string.isRequired,
    deltakertype: PropTypes.string.isRequired,
};

export const NavKan = ({ ledetekster }) => {
    return (<li className="alternativsvar__svar js-navssvar">
        <Ikon ikon="status--kan.svg" />
        <Svartekst
            deltakertype="NAV"
            tekst={getLedetekst('mote.svar.status.kan-mote', ledetekster, {
                '%NAVN%': 'Veilederen',
            })} />
    </li>);
};

NavKan.propTypes = {
    ledetekster: keyValue,
};

const SvarMedIkon = ({ bruker, svar, ledetekster }) => {
    const deltakertype = bruker.type === ARBEIDSGIVER ? 'Arbeidsgiver' : 'Arbeidstaker';
    return (<li className="alternativsvar__svar js-annenssvar">
        <Ikon ikon={getIkonFilnavn(bruker, svar)} />
        <Svartekst deltakertype={`${deltakertype}en`} navn={bruker.navn} tekst={getSvartekst(bruker, svar, ledetekster)} />
    </li>);
};

SvarMedIkon.propTypes = {
    bruker: motedeltakerPt,
    svar: motesvarPt,
    ledetekster: keyValue,
};

export default SvarMedIkon;
