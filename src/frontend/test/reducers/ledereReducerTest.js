import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import ledere from '../../js/reducers/ledere';
import {
    HENTER_LEDERE,
    LEDERE_HENTET,
    HENT_LEDERE_FEILET,
} from '../../js/actions/actiontyper';

describe('ledere', () => {
    it('Returnerer { data: [] } ved initializering', () => {
        const nextState = ledere();
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: false,
        });
    });

    it(`håndterer ${LEDERE_HENTET}`, () => {
        const initialState = deepFreeze({});
        const action = {
            type: LEDERE_HENTET,
            data: [{
                navn: 'Kurt Nilsen',
            }, {
                navn: 'Hans Hansen',
            }, {
                navn: 'Nina Knutsen',
            }],
        };
        const nextState = ledere(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [{
                navn: 'Kurt Nilsen',
            }, {
                navn: 'Hans Hansen',
            }, {
                navn: 'Nina Knutsen',
            }],
        });
    });

    it(`håndterer ${HENTER_LEDERE}`, () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = { type: HENTER_LEDERE };
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        });
    });

    it(`håndterer ${HENT_LEDERE_FEILET}`, () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = { type: HENT_LEDERE_FEILET };
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            data: [],
        });
    });
});
