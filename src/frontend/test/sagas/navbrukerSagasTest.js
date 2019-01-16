import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../js/api';
import { hentNavbruker } from '../../js/sagas/navbrukerSagas';
import {
    HENTER_NAVBRUKER,
    NAVBRUKER_HENTET,
} from '../../js/actions/actiontyper';

describe('navbrukerSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/sykefravaer',
        };
    });

    describe('hentNavbruker', () => {
        const generator = hentNavbruker({
            fnr: '55',
        });

        it('Skal dispatche HENTER_NAVBRUKER', () => {
            const nextPut = put({ type: HENTER_NAVBRUKER });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente navbruker', () => {
            const nextCall = call(get, 'http://tjenester.nav.no/sykefravaer/brukerinfo?fnr=55');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest dispatch ${NAVBRUKER_HENTET}`, () => {
            const nextPut = put({
                type: NAVBRUKER_HENTET,
                data: {
                    navn: 'Test Bestesen',
                },
            });
            expect(generator.next({
                navn: 'Test Bestesen',
            }).value).to.deep.equal(nextPut);
        });
    });
});
