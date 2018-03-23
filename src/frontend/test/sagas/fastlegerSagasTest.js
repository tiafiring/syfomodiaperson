import { expect } from 'chai';
import { hentFastleger } from '../../js/sagas/fastlegerSagas.js';
import { get } from '../../js/api/index';
import { put, call } from 'redux-saga/effects';
import * as actiontyper from '../../js/actions/actiontyper';

describe('fastlegerSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            FASTLEGEREST_ROOT: 'http://tjenester.nav.no',
        };
    });

    const generator = hentFastleger({
        fnr: '1'
    });

    it('Skal dispatche HENTER_FASTLEGER', () => {
        const nextPut = put({
            type: actiontyper.HENTER_FASTLEGER,
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
        const nextCall = call(get, `${window.APP_SETTINGS.FASTLEGEREST_ROOT}/fastlege/v1/fastleger?fnr=1`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette FASTLEGER_HENTET', () => {
        const nextPut = put({
            type: actiontyper.FASTLEGER_HENTET,
            data: 'mine data'
        });
        expect(generator.next('mine data').value).to.deep.equal(nextPut);
    });
});