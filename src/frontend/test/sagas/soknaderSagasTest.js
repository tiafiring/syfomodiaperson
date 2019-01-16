import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentSoknader } from '../../js/sagas/soknaderSagas';
import { get } from '../../js/api/index';
import * as actions from '../../js/actions/soknader_actions';
import {
    HENTER_SOKNADER,
    SOKNADER_HENTET,
} from '../../js/actions/actiontyper';
import mockSoknader from '../mockdata/mockSoknader';

describe('soknaderSagas', () => {
    describe('Henting av søknader', () => {
        const action = actions.hentSoknader();
        const generator = hentSoknader(action);
        const fnr = action.fnr || '';

        it(`Skal dispatche ${HENTER_SOKNADER}`, () => {
            const nextPut = put(actions.henterSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal hente søknader', () => {
            const nextCall = call(get, `${window.APP_SETTINGS.SYFOSOKNAD_ROOT}/veileder/soknader?fnr=${fnr}`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal deretter dispatche ${SOKNADER_HENTET}`, () => {
            const nextPut = put(actions.soknaderHentet(mockSoknader));
            expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
        });
    });
});
