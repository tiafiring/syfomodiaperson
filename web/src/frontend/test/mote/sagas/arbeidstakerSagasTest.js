import { expect } from 'chai';
import { hentArbeidstaker } from '../../../js/mote/sagas/arbeidstakerSagas.js';
import * as actions from '../../../js/mote/actions/arbeidstaker_actions.js';
import { get } from '../../../js/api';
import { put, call } from 'redux-saga/effects';

describe("arbeidstakerSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer",
            MOTEADMIN_REST_ROOT: "http://tjenester.nav.no/moteadmin"
        }
    });

    const action = actions.hentArbeidstaker("123")
    const generator = hentArbeidstaker(action);

    it("Skal dispatche HENTER_ARBEIDSTAKER", () => {
        const nextPut = put({type: 'HENTER_ARBEIDSTAKER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente arbeidstakere", () => {
        const nextCall = call(get, "http://tjenester.nav.no/moteadmin/brukerinfo/123");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest dispatche ARBEIDSTAKER_HENTET", () => {
        const nextPut = put(actions.arbeidstakerHentet({
            navn: "Ole"
        }));
        expect(generator.next({
            navn: "Ole"
        }).value).to.deep.equal(nextPut);
    });

})