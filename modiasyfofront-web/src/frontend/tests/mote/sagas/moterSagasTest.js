import { expect } from 'chai';
import { opprettMote } from '../../../js/mote/sagas/moterSagas.js';
import { post } from '../../../js/api';
import { put, call } from 'redux-saga/effects';

xdescribe("moterSagas", () => {

    beforeEach(() => {
        window.SYFO_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer"
        }
    })

    const generator = opprettMote({
        fnr: "55",
        data: {
            naermesteLederNavn: "***REMOVED***"
        }
    });

    it("Skal dispatche OPPRETTER_MOTE", () => {
        const nextPut = put({type: 'OPPRETTER_MOTE'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal poste møtet til REST-tjenesten", () => {
        const nextCall = call(post, "http://tjenester.nav.no/sykefravaer/rest/mote?fnr=55", {
            naermesteLederNavn: "***REMOVED***"
        });
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dispatche MOTE_OPPRETTET", () => {
        const nextPut = put({type: 'MOTE_OPPRETTET', data: {
            test: 1
        }});
        expect(generator.next({
            test: 1
        }).value).to.deep.equal(nextPut);
    });

});