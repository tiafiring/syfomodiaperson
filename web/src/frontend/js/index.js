import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import ledere from './reducers/ledere';
import navbruker from './reducers/navbruker';
import sykmeldinger from './reducers/sykmeldinger';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger';
import { reducer as formReducer } from 'redux-form';
import { ledetekster, hentLedetekster, tidslinjer, hasURLParameter } from 'digisyfo-npm';
import moter from './mote/reducers/moter';
import epostinnhold from './mote/reducers/epostinnhold';
import arbeidsgiverEpostinnhold from './mote/reducers/arbeidsgiverEpostinnhold';
import modiacontext from './reducers/modiacontext';
import historikk from './reducers/historikk';
import sykeforloep from './reducers/sykeforloep';
import sykepengesoknader from './reducers/sykepengesoknader';
import oppfoelgingsdialoger from './reducers/oppfoelgingsdialoger';
import veilederoppgaver from './reducers/veilederoppgaver';
import arbeidstaker from './mote/reducers/arbeidstaker';
import enhet from './mote/reducers/enhet';
import virksomhet from './mote/reducers/virksomhet';
import rootSaga from './sagas/index';
import { hentVeilederOppgaver } from './actions/veilederoppgaver_actions';
import { hentNavbruker } from './actions/navbruker_actions';
import { hentLedere } from './actions/ledere_actions';
import { pushModiaContext, hentAktivBruker, hentAktivEnhet } from './actions/modiacontext_actions';
import { valgtEnhet } from './mote/actions/enhet_actions';
import { opprettWebsocketConnection } from './contextHolder';

const rootReducer = combineReducers({
    history,
    ledere,
    navbruker,
    modiacontext,
    sykeforloep,
    historikk,
    moter,
    virksomhet,
    epostinnhold,
    arbeidsgiverEpostinnhold,
    arbeidstaker,
    oppfoelgingsdialoger,
    sykepengesoknader,
    enhet,
    tidslinjer,
    sykmeldinger,
    arbeidsgiversSykmeldinger,
    veilederoppgaver,
    ledetekster,
    form: formReducer,
});


const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const fnr = window.location.pathname.split('/')[2];
const config = {
    config: {
        dataSources: {
            veileder: `${window.location.origin}/mote/rest/veilederinfo`,
            enheter: `${window.location.origin}/mote/rest/enheter`,
        },
        toggles: {
            visEnhetVelger: true,
            visVeileder: true,
            visSokefelt: true,
            toggleSendEventVedEnEnhet: true,
        },
        handlePersonsokSubmit: (nyttFnr) => {
            if (nyttFnr !== fnr) {
                window.location = `/sykefravaer/${nyttFnr}`;
            }
        },
        fnr,
        applicationName: 'Sykefravær',
        handleChangeEnhet: (data) => {
            if (config.config.initiellEnhet !== data) {
                store.dispatch(valgtEnhet(data));
                store.dispatch(pushModiaContext({
                    verdi: data,
                    eventType: 'NY_AKTIV_ENHET',
                }));
                config.config.initiellEnhet = data;
            }
        },
    },
};
store.dispatch(hentVeilederOppgaver(fnr));
store.dispatch(hentNavbruker(fnr));
store.dispatch(hentLedere(fnr));
store.dispatch(hentAktivBruker({
    callback: (aktivBruker) => {
        if (aktivBruker !== fnr) {
            store.dispatch(pushModiaContext({
                verdi: fnr,
                eventType: 'NY_AKTIV_BRUKER',
            }));
        }
    },
}));
store.dispatch(hentAktivEnhet({
    callback: (aktivEnhet) => {
        if (aktivEnhet && config.config.initiellEnhet !== aktivEnhet) {
            store.dispatch(valgtEnhet(aktivEnhet));
            config.config.initiellEnhet = aktivEnhet;
            window.renderDecoratorHead(config);
        }
    },
}));
store.dispatch(hentLedetekster());

if (hasURLParameter('visLedetekster')) {
    localStorage.setItem('visLedetekster', true);
} else {
    localStorage.removeItem('visLedetekster');
}

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

document.addEventListener('DOMContentLoaded', () => {
    window.renderDecoratorHead && window.renderDecoratorHead(config);
});

opprettWebsocketConnection((wsCallback) => {
    if (wsCallback.data === 'NY_AKTIV_BRUKER') {
        store.dispatch(hentAktivBruker({
            callback: (aktivBruker) => {
                if (aktivBruker !== fnr) {
                    window.location = `/sykefravaer/${aktivBruker}`;
                }
            },
        }));
    } else if (wsCallback.data === 'NY_AKTIV_ENHET') {
        store.dispatch(hentAktivEnhet({
            callback: (aktivEnhet) => {
                if (config.config.initiellEnhet !== aktivEnhet) {
                    store.dispatch(valgtEnhet(aktivEnhet));
                    config.config.initiellEnhet = aktivEnhet;
                    window.renderDecoratorHead(config);
                }
            },
        }));
    }
});

export {
    store,
    history,
};
