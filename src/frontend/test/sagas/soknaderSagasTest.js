import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentSoknader } from '../../js/sagas/soknaderSagas';
import { get } from 'digisyfo-npm';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader from '../mockdata/mockSoknader';

describe('soknaderSagas', () => {
    describe('Henting av søknader', () => {
        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal dispatche HENTER_SOKNADER', () => {
            const nextPut = put(actions.henterSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal hente søknader', () => {
            const nextCall = call(get, '/syfosoknad/soknader');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNADER_HENTET', () => {
            const nextPut = put(actions.soknaderHentet(mockSoknader));
            expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
        });
    });
});
