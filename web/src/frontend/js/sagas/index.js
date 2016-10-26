import ledereSagas from './ledereSagas';
import navbrukerSagas from './navbrukerSagas';
import moterSagas from '../mote/sagas/moterSagas';

export default function * rootSaga() {
    yield [
        ledereSagas(),
        navbrukerSagas(),
        moterSagas(),
    ];
}
