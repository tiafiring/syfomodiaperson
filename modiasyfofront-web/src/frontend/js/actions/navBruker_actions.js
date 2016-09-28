export const setNavbruker = (data) => {
    return {
        type: 'SET_NAVBRUKER',
        data,
    };
};

export const henterNavbruker = () => {
    return {
        type: 'HENTER_NAVBRUKER',
    };
}

export const hentNavbrukerFeilet = () => {
    return {
        type: 'HENT_NAVBRUKER_FEILET',
    };
}

export function hentNavbruker(fnr) {
    return function bruker(dispatch) {
        dispatch(henterNavbruker());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/rest/brukerinfo?fnr=${fnr}`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.status > 400) {
                dispatch(hentNavbrukerFeilet());
            }
            return response.json();
        })
        .then((json) => {
            return dispatch(setNavbruker(json));
        })
        .catch((err) => {
            return dispatch(hentNavbrukerFeilet());
        });
    };
}
