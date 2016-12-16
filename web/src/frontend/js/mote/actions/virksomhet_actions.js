import { HENT_VIRKSOMHET_FORESPURT, HENTER_VIRKSOMHET, VIRKSOMHET_HENTET, HENT_VIRKSOMHET_FEILET } from './actiontyper';

export const hentVirksomhet = (orgnummer) => {
    return {
        type: HENT_VIRKSOMHET_FORESPURT,
        orgnummer,
    };
};

export const henterVirksomhet = () => {
    return {
        type: HENTER_VIRKSOMHET,
    };
};

export const virksomhetHentet = (orgnummer, data) => {
    return {
        type: VIRKSOMHET_HENTET,
        orgnummer,
        data,
    };
};

export const hentVirksomhetFeilet = () => {
    return {
        type: HENT_VIRKSOMHET_FEILET,
    };
};
