import ledereSagas from './ledereSagas';
import navbrukerSagas from './navbrukerSagas';
import moterSagas from '../mote/sagas/moterSagas';
import tidslinjerSagas from './tidslinjerSagas';
import { ledeteksterSagas } from 'digisyfo-npm';

export default function * rootSaga() {
    yield [
        ledereSagas(),
        navbrukerSagas(),
        moterSagas(),
        ledeteksterSagas(),
        tidslinjerSagas(),
    ];
}
