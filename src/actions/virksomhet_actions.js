export const HENT_VIRKSOMHET_FORESPURT = 'HENT_VIRKSOMHET_FORESPURT';
export const HENTER_VIRKSOMHET = 'HENTER_VIRKSOMHET';
export const VIRKSOMHET_HENTET = 'VIRKSOMHET_HENTET';
export const HENT_VIRKSOMHET_FEILET = 'HENT_VIRKSOMHET_FEILET';

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
