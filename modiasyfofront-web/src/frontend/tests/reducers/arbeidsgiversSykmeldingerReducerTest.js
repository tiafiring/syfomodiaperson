import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import arbeidsgiversSykmeldinger from '../../js/reducers/arbeidsgiversSykmeldinger';
import * as actions from '../../js/actions/arbeidsgiversSykmeldinger_actions';

describe("arbeidsgiversSykmeldinger", () => {
    it("Skal håndtere SET_ARBEIDSGIVERS_SYKMELDINGER", () => {
        const state = deepFreeze({
            data: []
        });
        const nextState = arbeidsgiversSykmeldinger(state, actions.setArbeidsgiversSykmeldinger([{
            navn: "Olsen"
        }]));
        expect(nextState).to.deep.equal({
            data: [{
                navn: "Olsen"
            }]
        })
    });
})
