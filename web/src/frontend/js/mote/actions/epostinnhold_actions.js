import { HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT, HENTER_EPOSTINNHOLD, EPOSTINNHOLD_HENTET, HENT_EPOSTINNHOLD_FEILET } from './actiontyper';

export const hentBekreftMoteEpostInnhold = (motedeltakerUuid, valgtAlternativId) => {
    return {
        type: HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT,
        motedeltakerUuid,
        valgtAlternativId,
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
