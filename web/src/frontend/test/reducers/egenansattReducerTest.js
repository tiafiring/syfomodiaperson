import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/egenansatt_actions';
import egenansatt from '../../js/reducers/egenansatt';

describe('egenansatt', () => {

    describe('henter', () => {
        let initialState = deepFreeze({
            henter: false,
            hentet: false,
            hentingFeilet: false,
            data: {},
        });

        it('håndterer HENTER_EGENANSATT', () => {
            const action = actions.henterEgenansatt();
            const nextState = egenansatt(initialState, action);
            expect(nextState).to.deep.equal({
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: {},
            });
        });

        it('håndterer EGENANSATT_HENTET', () => {
            const data = { erEgenAnsatt: 1};
            const action = actions.egenansattHentet(data);
            const nextState = egenansatt(initialState, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: true,
                hentingFeilet: false,
                data: data,
            });
        });

        it('håndterer HENT_EGENANSATT_FEILET', () => {
            const action = actions.hentEgenansattFeilet();
            const nextState = egenansatt(initialState, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: false,
                hentingFeilet: true,
                data: {},
            });
        });
    });
});
