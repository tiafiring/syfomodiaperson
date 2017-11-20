import { expect } from 'chai';
import * as actions from '../../../js/actions/virksomhet_actions';
import { hentVirksomhet } from '../../../js/sagas/virksomhetSagas';
import { get } from '../../../js/api/index';
import { put, call } from 'redux-saga/effects';

describe("virksomhetSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/sykefravaer",
            MOTEADMIN_REST_ROOT: "http://tjenester.nav.no/moteadmin"
        }
    });

    describe("Epost for bekreftelse av møtetidspunkt", () => {
        const orgnummer = "88776655"
        const action = actions.hentVirksomhet(orgnummer);
        const generator = hentVirksomhet(action);

        it("Skal dispatche HENTER_VIRKSOMHET", () => {
            const nextPut = put({type: 'HENTER_VIRKSOMHET'});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal deretter prøve å hente virksomhet", () => {
            const nextCall = call(get, "http://tjenester.nav.no/moteadmin/virksomhet/88776655");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal deretter si i fra om at virksomhet er hentet", () => {
            const data = {
                navn: "NAV Consulting",
            }
            const nextPut = put({type: 'VIRKSOMHET_HENTET', orgnummer, data });
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });

});