import { HENT_VIRKSOMHET_FORESPURT, HENTER_VIRKSOMHET, VIRKSOMHET_HENTET, HENT_VIRKSOMHET_FEILET, NULLSTILL_VIRKSOMHET } from './actiontyper';

export const hentVirksomhet = (orgnummer) => {
    return {
        type: HENT_VIRKSOMHET_FORESPURT,
        orgnummer,
    };
};

export const nullstillVirksomhet = () => {
    return {
        type: NULLSTILL_VIRKSOMHET,
    };
};

export const henterVirksomhet = () => {
    return {
        type: HENTER_VIRKSOMHET,
    };
};

export const virksomhetHentet = (data) => {
    return {
        type: VIRKSOMHET_HENTET,
        data,
    };
};

export const hentVirksomhetFeilet = () => {
    return {
        type: HENT_VIRKSOMHET_FEILET,
    };
};
