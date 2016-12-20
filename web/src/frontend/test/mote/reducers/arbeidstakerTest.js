import { expect } from 'chai';
import arbeidstaker from '../../../js/mote/reducers/arbeidstaker';
import * as actions from '../../../js/mote/actions/arbeidstaker_actions';
import deepFreeze from 'deep-freeze';

describe("arbeidstaker", () => {

    it("Har en default state", () => {
        const state = arbeidstaker();
        expect(state).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: false,
        })
    })

    it("Håndterer henterArbeidstaker", () => {
        const initState = deepFreeze({});
        const action = actions.henterArbeidstaker();
        const state = arbeidstaker(initState, action);
        expect(state).to.deep.equal({
            data: {},
            henter: true,
            hentingFeilet: false
        })
    })

    it("Håndterer hentArbeidstakerFeilet()", () => {
        const initState = deepFreeze({
            data: {},
            henter: true,
            hentingFeilet: false,
        });
        const action = actions.hentArbeidstakerFeilet();
        const state = arbeidstaker(initState, action);
        expect(state.hentingFeilet).to.be.true;
        expect(state.henter).to.be.false;
    });

    it("Håndterer arbeidstakerHentet", () => {
        const initState = deepFreeze({
            data: {},
            henter: true,
            hentingFeilet: false,
        });
        const action = actions.arbeidstakerHentet({
            navn: "Ole",
        })
        const state = arbeidstaker(initState, action);
        expect(state).to.deep.equal({
            data: {
                navn: "Ole",
            },
            henter: false,
            hentingFeilet: false,
        })
    })

});
