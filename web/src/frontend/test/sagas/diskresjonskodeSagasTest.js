import { expect } from 'chai';
import { hentDiskresjonskodeSaga } from '../../js/sagas/diskresjonskodeSagas.js';
import { get } from '../../js/api/index';
import { put, call } from 'redux-saga/effects';
import * as actiontyper from '../../js/actions/actiontyper';

describe('diskresjonskodeSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no',
        };
    });

    const generator = hentDiskresjonskodeSaga({
        fnr: '1',
    });

    it('Skal dispatche HENTER_DISKRESJONSKODE', () => {
        const nextPut = put({
            type: actiontyper.HENTER_DISKRESJONSKODE,
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
        const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/diskresjonskode/1`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette DISKRESJONSKODE_HENTET', () => {
        const nextPut = put({
            type: actiontyper.DISKRESJONSKODE_HENTET,
            data: 'mine data',
        });
        expect(generator.next('mine data').value).to.deep.equal(nextPut);
    });
});