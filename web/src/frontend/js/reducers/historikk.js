const defaultState = {
    data: [],
    hentingFeilet: false,
    henterMoter: false,
    hentetMoter: false,
    henterOppfoelgingsdialoger: false,
    hentetOppfoelgingsdialoger: false,
};

const historikk = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'HISTORIKK_HENTET_MOTER': {
            const nyHistorikk = action.data.map((event) => {
                event.kilde = 'MOTER';
                return event;
            });

            return Object.assign({}, state, {
                henterMoter: false,
                hentetMoter: true,
                data: state.data.concat(nyHistorikk),
            });
        }
        case 'HISTORIKK_HENTET_OPPFOELGINGSDIALOG': {
            const nyHistorikk = action.data.map((event) => {
                event.kilde = 'OPPFOELGINGSDIALOG';
                return event;
            });
            return Object.assign({}, state, {
                henterOppfoelgingsdialoger: false,
                hentetOppfoelgingsdialoger: true,
                data: state.data.concat(nyHistorikk),
            });
        }
        case 'HENTER_HISTORIKK_MOTER': {
            return Object.assign({}, state, {
                henterMoter: true,
            });
        }
        case 'HENTER_HISTORIKK_OPPFOELGINGSDIALOG': {
            return Object.assign({}, state, {
                henterOppfoelgingsdialoger: true,
            });
        }
        case 'HENT_HISTORIKK_FEILET_MOTER': {
            return Object.assign({}, state, {
                henterMoter: false,
                hentingFeilet: true,
            });
        }
        case 'HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG': {
            return Object.assign({}, state, {
                henterOppfoelgingsdialoger: false,
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
};

export default historikk;
