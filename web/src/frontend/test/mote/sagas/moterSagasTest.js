import { expect } from 'chai';
import { opprettMote, hentMoter, avbrytMote } from '../../../js/mote/sagas/moterSagas.js';
import { post, get } from '../../../js/api';
import { put, call } from 'redux-saga/effects';

describe("moterSagas", () => {

    beforeEach(() => {
        window.SYFO_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer",
            MOTEADMIN_REST_ROOT: "http://tjenester.nav.no/moteadmin"
        }
    })

    describe("opprettMote", () => {
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
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/moter/55/opprett", {
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

    describe("hentMoter", () => {
        const generator = hentMoter({
            fnr: "123"
        });

        it("Skal dispatche HENTER_MOTER", () => {
            const nextPut = put({type: 'HENTER_MOTER'});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal hente møter fra REST-tjenesten", () => {
            const nextCall = call(get, "http://tjenester.nav.no/moteadmin/moter/123");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTER_HENTET", () => {
            const nextPut = put({type: 'MOTER_HENTET', data: [{id: 1}]})
            expect(generator.next([{id: 1}]).value).to.deep.equal(nextPut);
        });        

    })

    describe("avbrytMote", () => {
        const generator = avbrytMote({
            uid: "min-fine-mote-uid"
        });

        it("Skal dispatche AVBRYTER_MOTE", () => {
            const nextPut = put({type: 'AVBRYTER_MOTE', uid: "min-fine-mote-uid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal poste til REST-tjenesten", () => {
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/mote/min-fine-mote-uid/avbryt");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTE_AVBRUTT", () => {
            const nextPut = put({type: 'MOTE_AVBRUTT', uid: "min-fine-mote-uid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

});