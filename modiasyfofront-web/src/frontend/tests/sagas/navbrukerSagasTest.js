import { expect } from 'chai';
import { hentNavbruker } from '../../js/sagas/navbrukerSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

window.SYFO_SETTINGS = {
    REST_ROOT: "http://tjenester.nav.no/sykefravaer"
}

describe("navbrukerSagas", () => {

    const generator = hentNavbruker({
        fnr: "55"
    });

    it("Skal dispatche HENTER_NAVBRUKER", () => {
        const nextPut = put({type: 'HENTER_NAVBRUKER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente navbruker", () => {
        const nextCall = call(get, "http://tjenester.nav.no/sykefravaer/brukerinfo?fnr=55");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest hente ledere", () => {
        const nextPut = put({
            type: 'NAVBRUKER_HENTET',
            data: {
                "navn": "***REMOVED***"
            }
        });
        expect(generator.next({
            "navn": "***REMOVED***"
        }).value).to.deep.equal(nextPut);
    });

});