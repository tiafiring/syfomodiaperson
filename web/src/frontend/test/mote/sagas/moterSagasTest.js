import {expect} from "chai";
import {
    opprettMote,
    hentMoter,
    avbrytMote,
    avbrytMoteUtenVarsel,
    bekreftMote
} from "../../../js/mote/sagas/moterSagas.js";
import * as actions from "../../../js/mote/actions/moter_actions";
import {post, get} from "../../../js/api/index";
import {put, call} from "redux-saga/effects";
import sinon from 'sinon';

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

        it("Skal poste møtet til REST-tjenesten", () => {
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/moter", {
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
            const nextCall = call(get, "http://tjenester.nav.no/moteadmin/moter?fnr=123&henttpsdata=true");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTER_HENTET", () => {
            const nextPut = put({type: 'MOTER_HENTET', data: [{id: 1}]})
            expect(generator.next([{id: 1}]).value).to.deep.equal(nextPut);
        });        

    })

    describe("avbrytMote", () => {
        const action = actions.avbrytMote("min-fine-mote-uuid");
        const generator = avbrytMote(action);

        it("Skal dispatche AVBRYTER_MOTE", () => {
            const nextPut = put({type: 'AVBRYTER_MOTE', uuid: "min-fine-mote-uuid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal poste til REST-tjenesten", () => {
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/moter/min-fine-mote-uuid/avbryt?varsle=true");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTE_AVBRUTT", () => {
            const nextPut = put({type: 'MOTE_AVBRUTT', uuid: "min-fine-mote-uuid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

    describe("avbrytMoteUtenVarsel", () => {
        const action = actions.avbrytMoteUtenVarsel("min-fine-mote-uuid", "887766");
        const generator = avbrytMote(action);

        it("Skal dispatche AVBRYTER_MOTE", () => {
            const nextPut = put({type: 'AVBRYTER_MOTE', uuid: "min-fine-mote-uuid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal poste til REST-tjenesten", () => {
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/moter/min-fine-mote-uuid/avbryt?varsle=false");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTE_AVBRUTT", () => {
            const nextPut = put({type: 'MOTE_AVBRUTT', uuid: "min-fine-mote-uuid"});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

    describe("bekreftMote", () => {
        const moteUuid = "olsen";
        const bekreftetAlternativId = 998877;

        action = actions.bekreftMote("olsen", 998877);

        const generator = bekreftMote(action);

        it("Skal dispatche BEKREFTER_MOTE", () => {
            const nextPut = put({type: 'BEKREFTER_MOTE'});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal poste til REST-tjenesten", () => {
            const nextCall = call(post, "http://tjenester.nav.no/moteadmin/moter/olsen/bekreft?bekreftetAlternativId=998877");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dispatche MOTE_BEKREFTET", () => {
            const date = new Date(2017, 3, 1);
            const clock = sinon.useFakeTimers(date.getTime());
            const nextPut = put({type: 'MOTE_BEKREFTET', moteUuid: "olsen", bekreftetAlternativId: 998877, bekreftetTidspunkt: date});
            expect(generator.next().value).to.deep.equal(nextPut);
            clock.restore();
        });

    });

});