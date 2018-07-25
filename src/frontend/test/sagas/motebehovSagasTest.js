import {expect} from "chai";
import {hentMotebehov} from "../../js/sagas/motebehovSagas.js";
import {get} from "../../js/api/index";
import {call, put} from "redux-saga/effects";

describe("motebehovSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer",
            SYFOMOTEBEHOV_ROOT: "http://tjenester.nav.no/syfomotebehov/api"
        }
    });

    describe("hentMotebehov", () => {
        const generator = hentMotebehov({
            fnr: "123"
        });

        it("Skal dispatche HENTER_MOTEBEHOV", () => {
            const nextPut = put({type: 'HENTER_MOTEBEHOV'});

            expect(generator.next().value).to.deep.equal(nextPut);
        });

        xit("Skal hente et array bestående av motebehov", () => {
            const nextCall = call(get, "http://tjenester.nav.no/syfomotebehov/motebehov?fnr=123");

            expect(generator.next().value).to.deep.equal(nextCall);
        });

        xit("Skal dispatche MOTEBEHOV_HENTET", () => {
            const nextPut = put({type: 'MOTEBEHOV_HENTET', data: [{id: 1}]});

            expect(generator.next([{id: 1}]).value).to.deep.equal(nextPut);
        });        

    })

});