import { HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT, HENTER_EPOSTINNHOLD, EPOSTINNHOLD_HENTET, HENT_EPOSTINNHOLD_FEILET, HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT, SET_VALGT_DELTAKER } from './actiontyper';

export const hentBekreftMoteEpostinnhold = (motedeltakerUuid, valgtAlternativId) => {
    return {
        type: HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT,
        motedeltakerUuid,
        valgtAlternativId,
    };
};

export const hentAvbrytMoteEpostinnhold = (motedeltakerUuid) => {
    return {
        type: HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT,
        motedeltakerUuid,
    };
};

export const henterEpostInnhold = () => {
    return {
        type: HENTER_EPOSTINNHOLD,
    };
};

export const epostInnholdHentet = (eposttype, data) => {
    return {
        type: EPOSTINNHOLD_HENTET,
        eposttype,
        data,
    };
};

export const hentEpostinnholdFeilet = () => {
    return {
        type: HENT_EPOSTINNHOLD_FEILET,
    };
};

export const setValgtDeltaker = (valgtDeltaker) => {
    return {
        type: SET_VALGT_DELTAKER,
        valgtDeltaker,
    };
};
