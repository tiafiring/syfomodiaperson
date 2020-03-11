import * as menypunkter from '../enums/menypunkter';
import { harUbehandletMotebehov } from './motebehovUtils';

const isUnfinishedMotebehovTask = (motebehovReducer) => {
    return harUbehandletMotebehov(motebehovReducer.data);
};

const isUnfinishedMoterTask = (moterReducer) => {
    return moterReducer
        && moterReducer.data
        && moterReducer.data[0]
        && moterReducer.data[0].trengerBehandling;
};

const activeOppfolgingsplaner = (oppfolgingsplanerReducer) => {
    return oppfolgingsplanerReducer
        && oppfolgingsplanerReducer.data
        && oppfolgingsplanerReducer.data.filter((dialog) => {
            return dialog.status !== 'AVBRUTT' && new Date(dialog.godkjentPlan.gyldighetstidspunkt.tom) > new Date();
        }).length;
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

export const numberOfTasks = (menypunkt, motebehovReducer, moterReducer, oppfolgingsplanerReducer) => {
    switch (menypunkt) {
        case menypunkter.MOETEPLANLEGGER:
            return moteplanleggerTasks(motebehovReducer, moterReducer);
        case menypunkter.OPPFOELGINGSPLANER:
            return activeOppfolgingsplaner(oppfolgingsplanerReducer);
        default:
            return 0;
    }
};
