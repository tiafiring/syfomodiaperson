import ledereSagas from './ledereSagas';
import navbrukerSagas from './navbrukerSagas';
import moterSagas from '../mote/sagas/moterSagas';
import epostinnholdSagas from '../mote/sagas/epostinnholdSagas';
import tidslinjerSagas from './tidslinjerSagas';
import virksomhetSagas from '../mote/sagas/virksomhetSagas';
import { ledeteksterSagas } from 'digisyfo-npm';

export default function * rootSaga() {
    yield [
        ledereSagas(),
        navbrukerSagas(),
        moterSagas(),
        ledeteksterSagas(),
        tidslinjerSagas(),
        epostinnholdSagas(),
        virksomhetSagas(),
    ];
}
