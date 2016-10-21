import { expect } from 'chai';
import { opprettMote } from '../../../js/mote/sagas/moterSagas.js';
import { post } from '../../../js/api';
import { put, call } from 'redux-saga/effects';

describe("moterSagas", () => {

    beforeEach(() => {
        window.SYFO_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer",
            MOTEADMIN_REST_ROOT: "http://tjenester.nav.no/moteadmin"
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
        const nextCall = call(post, "http://tjenester.nav.no/moteadmin/mote/55/opprett", {
            naermesteLederNavn: "***REMOVED***"
        });
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dispatche MOTE_OPPRETTET", () => {
        const nextPut = put({type: 'MOTE_OPPRETTET', data: {
            naermesteLederNavn: "***REMOVED***"
        },
        fnr: "55"});
        expect(generator.next({
            naermesteLederNavn: "***REMOVED***"
        }).value).to.deep.equal(nextPut);
    });

});