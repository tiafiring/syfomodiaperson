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

export const henterLedere = () => {
    return {
        type: 'HENTER_LEDERE',
    };
}

export const hentLedereFeilet = () => {
    return {
        type: 'HENT_LEDERE_FEILET',
    };
}

export function hentLedere(fnr) {
    return function ledere(dispatch) {
        dispatch(henterLedere());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/rest/naermesteleder?fnr=${fnr}`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.status > 400) {
                dispatch(hentLedereFeilet());
            }
            return response.json();
        })
        .then((json) => {
            return dispatch(setLedere(json));
        })
        .catch((err) => {
            return dispatch(hentLedereFeilet());
        });
    };
}
