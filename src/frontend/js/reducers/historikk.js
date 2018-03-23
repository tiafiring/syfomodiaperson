const defaultState = {
    moteHistorikk: [],
    oppfoelgingsdialogHistorikkk: [],
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
                return Object.assign({}, event, {
                    kilde: 'MOTER',
                });
            });

            return Object.assign({}, state, {
                henterMoter: false,
                hentetMoter: true,
                moteHistorikk: nyHistorikk,
            });
        }
        case 'HISTORIKK_HENTET_OPPFOELGINGSDIALOG': {
            const nyHistorikk = action.data.map((event) => {
                return Object.assign({}, event, {
                    kilde: 'OPPFOELGINGSDIALOG',
                });
            });
            return Object.assign({}, state, {
                henterOppfoelgingsdialoger: false,
                hentetOppfoelgingsdialoger: true,
                oppfoelgingsdialogHistorikkk: nyHistorikk,
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
