import * as actions from '../actions/actiontyper';

const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    nyeAlternativFeilet: false,
    senderNyeAlternativ: false,
    antallNyeTidspunkt: 0,
    skjermetBruker: false,
};

export default function moter(state = defaultState, action) {
    switch (action.type) {
        case actions.OPPRETTER_MOTE: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: true,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.MOTE_OPPRETTET: {
            const mote = Object.assign({}, action.data, {
                fnr: action.data.fnr,
                status: 'OPPRETTET',
            });
            return Object.assign({}, state, {
                data: [...state.data, mote],
            }, {
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.OPPRETT_MOTE_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.HENTER_MOTER: {
            return Object.assign({}, state, {
                data: [],
                sender: false,
                henter: true,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.MOTER_HENTET: {
            return Object.assign({}, state, {
                data: action.data,
                sender: false,
                henter: false,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.HENT_MOTER_FEILET: {
            return Object.assign({}, state, {
                data: [],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: true,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.AVBRYTER_MOTE: {
            return Object.assign({}, state, {
                avbryter: true,
                avbrytFeilet: false,
            });
        }
        case actions.AVBRYT_MOTE_FEILET: {
            return Object.assign({}, state, {
                avbrytFeilet: true,
                avbryter: false,
            });
        }
        case actions.MOTE_AVBRUTT: {
            const data = state.data.map((mote) => {
                if (mote.moteUuid === action.uuid) {
                    return Object.assign({}, mote, {
                        status: 'AVBRUTT',
                    });
                }
                return mote;
            });
            return Object.assign({}, state, { data }, {
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.BEKREFTER_MOTE: {
            return Object.assign({}, state, {
                bekrefter: true,
                bekreftFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.MOTE_BEKREFTET: {
            const data = state.data.map((mote) => {
                if (mote.moteUuid === action.moteUuid) {
                    const bekreftetAlternativ = mote.alternativer.filter((alternativ) => {
                        return alternativ.id === action.bekreftetAlternativId;
                    })[0];
                    return Object.assign({}, mote, {
                        status: 'BEKREFTET',
                        bekreftetTidspunkt: action.bekreftetTidspunkt,
                        bekreftetAlternativ,
                    });
                }
                return mote;
            });
            return Object.assign({}, state, { data }, {
                bekrefter: false,
                bekreftFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.BEKREFT_MOTE_FEILET: {
            return Object.assign({}, state, {
                bekrefter: false,
                bekreftFeilet: true,
            });
        }
        case actions.FLERE_ALTERNATIV: {
            let antallNyeTidspunkt;
            if (!state.antallNyeTidspunkt) {
                antallNyeTidspunkt = 2;
            } else {
                antallNyeTidspunkt = state.antallNyeTidspunkt + 1;
            }

            return Object.assign({}, state, {
                antallNyeTidspunkt,
            });
        }
        case actions.AVBRYT_FLERE_ALTERNATIV: {
            return Object.assign({}, state, {
                antallNyeTidspunkt: undefined,
            });
        }
        case actions.OPPRETTER_FLERE_ALTERNATIV: {
            return Object.assign({}, state, {
                senderNyeAlternativ: true,
                nyeAlternativFeilet: false,
            });
        }
        case actions.OPPRETT_FLERE_ALTERNATIV_FEILET: {
            return Object.assign({}, state, {
                nyeAlternativFeilet: true,
                senderNyeAlternativ: false,
            });
        }
        case actions.OPPRETT_FLERE_ALTERNATIV_BEKREFTET: {
            state.data.filter((mote) => {
                return mote.moteUuid === action.moteUuid;
            }).map((mote) => {
                mote.deltakere.map((deltaker) => {
                    return deltaker.svar.push.apply(deltaker.svar, action.data.alternativer);
                });
                mote.alternativer.push.apply(mote.alternativer, action.data.alternativer);
                return mote;
            });

            return Object.assign({}, state, {
                antallNyeTidspunkt: undefined,
                nyeAlternativFeilet: false,
                senderNyeAlternativ: false,
            });
        }
        case actions.MOTE_IKKE_TILGANG: {
            return Object.assign({}, state, {
                skjermetBruker: true,
                henter: false,
                hentingFeilet: false,
            });
        }
        default: {
            return state;
        }
    }
}
