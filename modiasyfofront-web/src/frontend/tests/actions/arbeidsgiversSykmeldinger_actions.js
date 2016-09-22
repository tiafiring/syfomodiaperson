import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/arbeidsgiversSykmeldinger_actions.js';

describe('arbeidsgiversSykmeldinger_actions', () => {

    it("Har en setArbeidsgiversSykmeldinger()-funksjon", () => {
        const sykmeldinger = [{
            navn: "***REMOVED***"
        }]
        const res = actions.setArbeidsgiversSykmeldinger(sykmeldinger);
        expect(res).to.deep.equal({
            type: "SET_ARBEIDSGIVERS_SYKMELDINGER",
            data: [{
                navn: "***REMOVED***"
            }]
        })
    });

});