export const toggleApenLeder = (lederId) => {
    return {
        type: 'TOGGLE_APEN_LEDER',
        lederId,
    };
};

export const hentLedere = (fnr) => {
    return {
        type: 'HENT_LEDERE_FORESPURT',
        fnr,
    };
}
