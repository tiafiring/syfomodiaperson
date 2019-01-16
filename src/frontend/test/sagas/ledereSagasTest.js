import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../js/api/index';
import { hentLedere } from '../../js/sagas/ledereSagas';
import {
    HENTER_LEDERE,
    LEDERE_HENTET,
} from '../../js/actions/actiontyper';

describe('ledereSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/sykefravaer',
        };
    });

    const generator = hentLedere({
        fnr: '55',
    });

    it(`Skal dispatche ${HENTER_LEDERE}`, () => {
        const nextPut = put({ type: HENTER_LEDERE });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente ledere', () => {
        const nextCall = call(get, 'http://tjenester.nav.no/sykefravaer/naermesteleder?fnr=55');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest hente ledere', () => {
        const nextPut = put({
            type: LEDERE_HENTET,
            data: 'mine data',
        });
        expect(generator.next('mine data').value).to.deep.equal(nextPut);
    });
});
