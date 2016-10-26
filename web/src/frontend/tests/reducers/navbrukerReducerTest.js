import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import navbruker from '../../js/reducers/navbruker.js';

describe('navbruker', () => {

    it("Returnerer { data: {} } ved initializering", () => {
        const nextState = navbruker();
        expect(nextState).to.deep.equal({
            data: { harTilgang: false }
        });
    });

    it("Håndterer NAVBRUKER_HENTET når man ikke har data fra før", () => {
        const initialState = deepFreeze({});
        const action = {
            type: 'NAVBRUKER_HENTET',
            data: {
                navn: "Kurt Nilsen"
            },
        };
        const nextState = navbruker(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: {
                navn: "Kurt Nilsen"
            }
        });

    });

    it("Håndterer NAVBRUKER_HENTET når man har data fra før", () => {
        const initialState = deepFreeze({
            data: {
                fnr: "12345689"
            }
        });
        const action = {
            type: 'NAVBRUKER_HENTET',
            data: {
                navn: "Kurt Nilsen",
            },
        };
        const nextState = navbruker(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: {
                navn: "Kurt Nilsen",
                fnr: "12345689"
            }
        });

    });

    it("Håndterer HENT_NAVBRUKER_FORESPURT", () => {
        const initialState = deepFreeze({
            data: {
                test: 1
            }
        });
        const action = {
            type: 'HENT_NAVBRUKER_FORESPURT',
            fnr: "123456"
        };
        const nextState = navbruker(initialState, action);
        expect(nextState).to.deep.equal({
            data: {
                test: 1,
                fnr: "123456"
            },
            henter: true,
            hentingFeilet: false,
        })
    });

    it("Håndterer HENT_NAVBRUKER_FEILET", () => {
        const initialState = deepFreeze({
            data: {
                test: 1
            }
        });
        const action = {
            type: 'HENT_NAVBRUKER_FEILET'
        };
        const nextState = navbruker(initialState, action);
        expect(nextState).to.deep.equal({
            data: {
                test: 1,
            },
            henter: false,
            hentingFeilet: true,
        })
    });


    it("Håndterer SJEKK_TILGANG_MOTEADMIN_FORESPURT", () => {
        const initialState = deepFreeze({
            data: {
                test: 1
            }
        });
        const action = {
            type: 'SJEKK_TILGANG_MOTEADMIN_FORESPURT'
        };
        const nextState = navbruker(initialState, action);
        expect(nextState).to.deep.equal({
            data: {
                test: 1
            },
            henter: true,
            hentingFeilet: false,
        })
    });

    it("Håndterer TILGANG_MOTEMODUL_HENTET når man har data fra før", () => {
        const initialState = deepFreeze({
            data: {
                harTilgang: false
            }
        });
        const action = {
            type: 'TILGANG_MOTEMODUL_HENTET',
            data: {
                harTilgang:true,
            },
        };
        const nextState = navbruker(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: {
                harTilgang:true,
            }
        });
    });

    it("Håndterer TILGANG_MOTEMODUL_FEILET", () => {
        const initialState = deepFreeze({
            data: {
                harTilgang:false,
            }
        });
        const action = {
            type: 'TILGANG_MOTEMODUL_FEILET'
        };
        const nextState = navbruker(initialState, action);
        expect(nextState).to.deep.equal({
            data: {
                harTilgang:false,
            },
            henter: false,
            hentingFeilet: true,
        })
    });


});