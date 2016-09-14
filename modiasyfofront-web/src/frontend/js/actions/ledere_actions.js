export const setLedere = (data) => {
    return {
        type: 'SET_LEDERE',
        data,
    };
};

export const toggleApenLeder = (lederId) => {
    return {
        type: 'TOGGLE_APEN_LEDER',
        lederId,
    };
};
