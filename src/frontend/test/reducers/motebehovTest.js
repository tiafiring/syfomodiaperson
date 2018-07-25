import { expect } from 'chai';
import motebehov, {sorterEtterDato} from '../../js/reducers/motebehov';
import * as actions from '../../js/actions/motebehov_actions';
import deepFreeze from 'deep-freeze';
import sinon from 'sinon';

describe('motebehov', () => {
    let clock;
    const today = new Date('2017-01-16');

    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime()); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('HENT MØTEBEHOV', () => {
        it('Håndterer HENTER_MOTEBEHOV', () => {
            const initialState = deepFreeze({});
            const action = actions.henterMotebehov();

            const nextState = motebehov(initialState, action);

            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentingFeilet: false,
            });
        });

        it('Håndterer MOTEBEHOV_HENTET, med sortert motebehovliste', () => {
            const initialState = deepFreeze({
                data: [],
                henter: true,
            });
            const action = actions.motebehovHentet([{
                "id": "1",
                "opprettetDato": "2017-02-22",
                "opprettetAv": "123",
                "arbeidstaker": {
                    "fnr": "123"
                },
                "motebehovSvar": {
                    "friskmeldingForventning": 'Ja, i morgen',
                    "tiltak": 'Ligge paa sofaen',
                    "tiltakResultat": "Funket bra",
                    "harMotebehov": true,
                    "forklaring": "Flere tiltak"
                }
            },
                {
                    "id": "2",
                    "opprettetDato": "2017-02-24",
                    "opprettetAv": "123",
                    "arbeidstaker": {
                        "fnr": "123"
                    },
                    "motebehovSvar": {
                        "friskmeldingForventning": 'Nei',
                        "tiltak": 'Ligge paa sofaen',
                        "tiltakResultat": "Funket daarlig",
                        "harMotebehov": false,
                        "forklaring": "Jeg vil ikke ha hjelp!"
                    }
                }]);

            const nextState = motebehov(initialState, action);

            expect(nextState).to.deep.equal({
                data: [{
                    "id": "2",
                    "opprettetDato": "2017-02-24",
                    "opprettetAv": "123",
                    "arbeidstaker": {
                        "fnr": "123"
                    },
                    "motebehovSvar": {
                        "friskmeldingForventning": 'Nei',
                        "tiltak": 'Ligge paa sofaen',
                        "tiltakResultat": "Funket daarlig",
                        "harMotebehov": false,
                        "forklaring": "Jeg vil ikke ha hjelp!"
                    }
                },
                    {
                    "id": "1",
                    "opprettetDato": "2017-02-22",
                    "opprettetAv": "123",
                    "arbeidstaker": {
                        "fnr": "123"
                    },
                    "motebehovSvar": {
                        "friskmeldingForventning": 'Ja, i morgen',
                        "tiltak": 'Ligge paa sofaen',
                        "tiltakResultat": "Funket bra",
                        "harMotebehov": true,
                        "forklaring": "Flere tiltak"
                    }
                }],
                henter: false,
                hentingFeilet: false,
            });
        });

        it('Håndterer HENT_MOTEBEHOV_FEILET', () => {
            const initialState = deepFreeze({});
            const action = actions.hentMotebehovFeilet();

            const nextState = motebehov(initialState, action);

            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        });
    });

    describe('sorterEtterDato', () => {
        it('Returnerer nyeste dato', () => {
            const eldsteMotebehov = {
                id: '1',
                opprettetDato: new Date(Date.now() - 3600000)
            };
            const nyesteMotebehov = {
                id: '2',
                opprettetDato: new Date(Date.now())
            };

           const resultat = sorterEtterDato(eldsteMotebehov, nyesteMotebehov);

           expect(resultat).to.equal(1);
        });
    });
});
