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
import modiacontext from './reducers/modiacontext';
import arbeidstaker from './mote/reducers/arbeidstaker';
import enhet from './mote/reducers/enhet';
import virksomhet from './mote/reducers/virksomhet';
import rootSaga from './sagas/index';
import { hentNavbruker, sjekkTilgangMoteadmin } from './actions/navbruker_actions';
import { pushModiaContext, hentAktivBruker, hentAktivEnhet } from './actions/modiacontext_actions';
import { valgtEnhet } from './mote/actions/enhet_actions';
import { opprettWebsocketConnection } from './contextHolder';

const rootReducer = combineReducers({
    history,
    ledere,
    navbruker,
    modiacontext,
    moter,
    virksomhet,
    epostinnhold,
    arbeidstaker,
    enhet,
    tidslinjer,
    sykmeldinger,
    arbeidsgiversSykmeldinger,
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
        toggles: {
            visEnhetVelger: true,
            visVeileder: true,
            visSokefelt: true,
            overrideenhetersaga: true,
            overrideveiledersaga: true,
        },
        handlePersonsokSubmit: (nyttFnr) => {
            if (nyttFnr !== fnr) {
                window.location = `/sykefravaer/${nyttFnr}`;
            }
        },
        fnr,
        applicationName: 'Sykefravær',
        handleChangeEnhet: (data) => {
            store.dispatch(valgtEnhet(data));
            store.dispatch(pushModiaContext({
                verdi: data,
                eventType: 'NY_AKTIV_ENHET',
            }));
        },
    },
};
store.dispatch(hentNavbruker(fnr));
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
        store.dispatch(valgtEnhet(aktivEnhet));
        config.config.initiellEnhet = aktivEnhet;
        window.renderDecoratorHead(config);
    },
}));
store.dispatch(sjekkTilgangMoteadmin());
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
    window.renderDecoratorHead(config);
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
