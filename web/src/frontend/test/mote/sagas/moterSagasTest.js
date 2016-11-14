import { expect } from 'chai';
import { opprettMote, hentMoter, avbrytMote } from '../../../js/mote/sagas/moterSagas.js';
import { post, get, create } from '../../../js/api/index';
import { put, call } from 'redux-saga/effects';

describe("moterSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer",
            MOTEADMIN_REST_ROOT: "http://tjenester.nav.no/moteadmin"
        }
    })

    describe("opprettMote", () => {
        const generator = opprettMote({
            data: {
                fnr: "55",
                naermesteLederNavn: "***REMOVED***"
            }
        });

        it("Skal dispatche OPPRETTER_MOTE", () => {
            const nextPut = put({type: 'OPPRETTER_MOTE'});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal pute møtet til REST-tjenesten", () => {
            const nextCall = call(create, "http://tjenester.nav.no/moteadmin/moter", {
                fnr: "55",
                naermesteLederNavn: "***REMOVED***"
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTE_OPPRETTET", () => {
            const nextPut = put({type: 'MOTE_OPPRETTET', fnr: "55", data: {
                naermesteLederNavn: "***REMOVED***",
                fnr: "55"}
            });
            expect(generator.next({
                naermesteLederNavn: "***REMOVED***",
                fnr: "55",
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
            const nextCall = call(get, "http://tjenester.nav.no/moteadmin/moter?fnr=123");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTER_HENTET", () => {
            const nextPut = put({type: 'MOTER_HENTET', data: [{id: 1}]})
            expect(generator.next([{id: 1}]).value).to.deep.equal(nextPut);
        });        

    })

    describe("avbrytMote", () => {
        const generator = avbrytMote({
            uuid: "min-fine-mote-uuid"
        });

        it("Skal dispatche AVBRYTER_MOTE", () => {
            const nextPut = put({type: 'AVBRYTER_MOTE', uuid: "min-fine-mote-uuid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal poste til REST-tjenesten", () => {
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/moter/min-fine-mote-uuid/avbryt");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTE_AVBRUTT", () => {
            const nextPut = put({type: 'MOTE_AVBRUTT', uuid: "min-fine-mote-uuid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

});