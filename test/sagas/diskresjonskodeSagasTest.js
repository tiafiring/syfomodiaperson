import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentDiskresjonskodeSaga } from '../../src/sagas/diskresjonskodeSagas';
import { get } from '../../src/api';
import {
    HENTER_DISKRESJONSKODE,
    DISKRESJONSKODE_HENTET,
} from '../../src/actions/diskresjonskode_actions';

describe('diskresjonskodeSagas', () => {
    beforeEach(() => {
        process.env = {
            REACT_APP_REST_ROOT: 'http://tjenester.nav.no',
        };
    });

    const generator = hentDiskresjonskodeSaga({
        fnr: '1',
    });

    it(`Skal dispatche ${HENTER_DISKRESJONSKODE}`, () => {
        const nextPut = put({
            type: HENTER_DISKRESJONSKODE,
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
        const nextCall = call(get, `${process.env.REACT_APP_REST_ROOT}/internad/diskresjonskode/1`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it(`Skal dernest sette ${DISKRESJONSKODE_HENTET}`, () => {
        const nextPut = put({
            type: DISKRESJONSKODE_HENTET,
            data: 'mine data',
        });
        expect(generator.next('mine data').value).to.deep.equal(nextPut);
    });
});
