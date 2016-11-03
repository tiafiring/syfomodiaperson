export const hentLedere = (fnr) => {
    return {
        type: 'HENT_LEDERE_FORESPURT',
        fnr,
    };
};
