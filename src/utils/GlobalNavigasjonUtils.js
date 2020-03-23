import * as menypunkter from '../enums/menypunkter';
import { harUbehandletMotebehov } from './motebehovUtils';
import { activeOppfolgingsplaner } from './oppfolgingsplanerUtils';

const isUnfinishedMotebehovTask = (motebehovReducer) => {
    return harUbehandletMotebehov(motebehovReducer.data);
};

const isUnfinishedMoterTask = (moterReducer) => {
    return moterReducer
        && moterReducer.data
        && moterReducer.data[0]
        && moterReducer.data[0].trengerBehandling;
};

const moteplanleggerTasks = (motebehovReducer, moterReducer) => {
    const motebehovPrikker = isUnfinishedMotebehovTask(motebehovReducer)
        ? 1
        : 0;

    const moterPrikker = isUnfinishedMoterTask(moterReducer)
        ? 1
        : 0;

    return motebehovPrikker + moterPrikker;
};

const numberOfActiveOppfolgingsplaner = (oppfolgingsplanerReducer) => {
    return oppfolgingsplanerReducer
        && oppfolgingsplanerReducer.data
        && activeOppfolgingsplaner(oppfolgingsplanerReducer.data).length;
};

export const numberOfTasks = (menypunkt, motebehovReducer, moterReducer, oppfolgingsplanerReducer) => {
    switch (menypunkt) {
        case menypunkter.MOETEPLANLEGGER:
            return moteplanleggerTasks(motebehovReducer, moterReducer);
        case menypunkter.OPPFOELGINGSPLANER:
            return numberOfActiveOppfolgingsplaner(oppfolgingsplanerReducer);
        default:
            return 0;
    }
};
