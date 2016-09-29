import ledereSagas from './ledereSagas';
import navbrukerSagas from './navbrukerSagas';

export default function * rootSaga() {
    yield [
        ledereSagas(),
        navbrukerSagas(),
    ];
}
