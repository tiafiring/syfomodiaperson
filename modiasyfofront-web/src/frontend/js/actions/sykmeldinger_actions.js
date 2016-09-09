import fetch from 'isomorphic-fetch';

export function henterSykmeldinger() {
    return {
        type: 'HENTER_SYKMELDINGER',
    };
}

export function hentSykmeldingerFeilet() {
    return {
        type: 'HENT_SYKMELDINGER_FEILET',
    };
}

export function setSykmeldinger(sykmeldinger = []) {
    return {
        type: 'SET_SYKMELDINGER',
        sykmeldinger,
    };
}

export function sorterSykmeldinger(kriterium, status) {
    return {
        type: 'SET_SORTERING',
        kriterium,
        status,
    };
}

export function hentSykmeldinger() {
    return function sykmeldinger(dispatch) {
        dispatch(henterSykmeldinger());
        const url = `${window.SYFO_SETTINGS.REST_ROOT}/rest//sykmeldinger`;
        return fetch(url, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentSykmeldingerFeilet());
                }
                return response.json();
            })
            .then((json) => {
                if (json && json.constructor === Array) {
                    return dispatch(setSykmeldinger(json));
                }
                return dispatch(hentSykmeldingerFeilet());
            })
            .catch(() => {
                return dispatch(hentSykmeldingerFeilet());
            });
    };
}

