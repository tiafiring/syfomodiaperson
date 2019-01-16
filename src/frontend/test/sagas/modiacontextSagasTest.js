import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get, post } from '../../js/api/index';
import {
    aktivEnhetSaga,
    pushModiacontextSaga,
    aktivBrukerSaga,
} from '../../js/sagas/modiacontextSagas';
import {
    HENTER_AKTIVENHET,
    PUSHER_MODIACONTEXT,
    HENTER_AKTIVBRUKER,
} from '../../js/actions/actiontyper';

describe('modiacontextSagas', () => {
    describe('aktivEnhetSaga', () => {
        const generator = aktivEnhetSaga();

        it(`Skal dispatche ${HENTER_AKTIVENHET}`, () => {
            const nextPut = put({ type: HENTER_AKTIVENHET });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente aktiv enhet', () => {
            const nextCall = call(get, 'null/modiacontextholder/api/context/aktivenhet');
            expect(generator.next().value).to.deep.equal(nextCall);
        });
    });

    describe('aktivBrukerSaga', () => {
        const generator = aktivBrukerSaga();

        it(`Skal dispatche ${HENTER_AKTIVBRUKER}`, () => {
            const nextPut = put({ type: HENTER_AKTIVBRUKER });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente aktiv bruker', () => {
            const nextCall = call(get, 'null/modiacontextholder/api/context/aktivbruker');
            expect(generator.next().value).to.deep.equal(nextCall);
        });
    });


    describe('pushModiacontextSaga', () => {
        const generator = pushModiacontextSaga({
            data: {
                verdi: 'fnr',
                eventType: 'event1',
            },
        });

        it(`Skal dispatche ${PUSHER_MODIACONTEXT}`, () => {
            const nextPut = put({ type: PUSHER_MODIACONTEXT });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest pushe context', () => {
            const nextCall = call(post, 'null/modiacontextholder/api/context', {
                verdi: 'fnr',
                eventType: 'event1',
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });
    });
});
