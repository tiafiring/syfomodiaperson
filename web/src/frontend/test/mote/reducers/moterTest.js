import { expect } from 'chai';
import moter from '../../../js/mote/reducers/moter';
import * as actions from '../../../js/mote/actions/moter_actions';
import { getData } from '../../../js/mote/skjema/MotebookingSkjema';
import deepFreeze from 'deep-freeze';
import sinon from 'sinon';

export const getMote = (mote) => {
    return Object.assign({}, {
        "status": "OPPRETTET",
        'moteUuid': 'min-mote-uuid',
        "opprettetTidspunkt": new Date("2017-02-22T15:18:24.323"),
        "bekreftetTidspunkt": null,
        "deltakere": [{
            "hendelser": [],
            "deltakerUuid": "uuid1",
            "navn": "Are Arbeidsgiver",
            "orgnummer": "***REMOVED***",
            "epost": "are.arbeidsgiver@nav.no",
            "type": "arbeidsgiver",
            "svartidspunkt": null,
            "svar": [{
                "id": 1,
                "tid": new Date("2017-03-07T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }, {
                "id": 3,
                "tid": new Date("2017-02-25T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }, {
                "id": 2,
                "tid": new Date("2017-03-09T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }]
        }, {
            "hendelser": [],
            "deltakerUuid": "uuid2",
            "navn": "Sygve Sykmeldt",
            "orgnummer": null,
            "epost": null,
            "type": "Bruker",
            "svartidspunkt": null,
            "svar": [{
                "id": 1,
                "tid": new Date("2017-03-07T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }, {
                "id": 3,
                "tid": new Date("2017-02-25T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }, {
                "id": 2,
                "tid": new Date("2017-03-09T15:18:24.323"),
                "created": new Date("2017-02-22T15:18:24.323"),
                "sted": "Sannergata 2",
                "valgt": false
            }]
        }],
        "bekreftetAlternativ": null,
        "alternativer": [{
            "id": 1,
            "tid": new Date("2017-03-07T15:18:24.323"),
            "created": new Date("2017-02-22T15:18:24.323"),
            "sted": "Sannergata 2",
            "valgt": false
        }, {
            "id": 3,
            "tid": new Date("2017-02-25T15:18:24.323"),
            "created": new Date("2017-02-22T15:18:24.323"),
            "sted": "Sannergata 2",
            "valgt": false
        }, {
            "id": 2,
            "tid": new Date("2017-02-25T15:18:24.323"),
            "created": new Date("2017-02-22T15:18:24.323"),
            "sted": "Sannergata 2",
            "valgt": false
        }, ]
    }, mote);
};

describe('moter', () => {

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    })

    afterEach(() => {
        clock.restore();
    });

    describe('OPPRETT MØTE', () => {
        it('Håndterer OPPRETTER_MOTE', () => {
            const initialState = deepFreeze({
                data: []
            });
            const action = actions.oppretterMote();
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });

        it('Håndterer MOTE_OPPRETTET', () => {
            const initialState = deepFreeze({
                data: []
            });
            const data = getData({
                "deltakere": [
                    {
                        "navn": "***REMOVED***",
                        "epost": "***REMOVED***",
                    }
                ],
                "tidspunkter": [
                    {
                        "dato": "12.08.2016",
                        "klokkeslett": "15.00"
                    },
                    {
                        "dato": "13.08.2016",
                        "klokkeslett": "12.00"
                    }
                ],
                "sted": "Oslo"
            })
            const action = actions.moteOpprettet(data)
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    "alternativer": [{
                        "tid": new Date("2016-08-12T13:00:00.000Z"),
                        "sted": "Oslo",
                        "valgt": false,
                        "created": new Date(),
                    }, {
                        "tid": new Date("2016-08-13T10:00:00.000Z"),
                        "sted": "Oslo",
                        "valgt": false,
                        "created": new Date(),
                    }],
                    "status": "OPPRETTET",
                    "deltakere": [{
                        "navn": "***REMOVED***",
                        "epost": "***REMOVED***",
                        "type": "arbeidsgiver",
                        "svar": [{
                            "tid": new Date("2016-08-12T13:00:00.000Z"),
                            "sted": "Oslo",
                            "valgt": false,
                            "created": new Date(),
                        }, {
                            "tid": new Date("2016-08-13T10:00:00.000Z"),
                            "sted": "Oslo",
                            "valgt": false,
                            "created": new Date(),
                        }],
                    }],
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });

        it('Håndterer OPPRETT_MOTE_FEILET', () => {
            const initialState = deepFreeze({
                data: []
            });
            const action = actions.opprettMoteFeilet();
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });
    });

    describe('HENT MØTER', () => {
        it('Håndterer HENTER_MOTER', () => {
            const initialState = deepFreeze({});
            const action = actions.henterMoter();
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                sender: false,
                henter: true,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });

        it('Håndterer MOTER_HENTET', () => {
            const initialState = deepFreeze({
                data: [],
                henter: true,
            });
            const action = actions.moterHentet([{
                "status": "OPPRETTET",
                "opprettetTidspunkt": "2017-02-22T15:18:24.323",
                "bekreftetTidspunkt": null,
                "deltakere": [{
                    "hendelser": [],
                    "deltakerUuid": "uuid1",
                    "navn": "Are Arbeidsgiver",
                    "orgnummer": "***REMOVED***",
                    "epost": "are.arbeidsgiver@nav.no",
                    "type": "arbeidsgiver",
                    "svartidspunkt": "2017-03-07T15:18:24.323",
                    "svar": [{
                        "id": 1,
                        "tid": "2017-03-07T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": "2017-03-09T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }]
                }, {
                    "hendelser": [],
                    "deltakerUuid": "uuid2",
                    "navn": "Sygve Sykmeldt",
                    "orgnummer": null,
                    "epost": null,
                    "type": "Bruker",
                    "svartidspunkt": null,
                    "svar": [{
                        "id": 1,
                        "tid": "2017-03-07T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": "2017-03-09T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }]
                }],
                "bekreftetAlternativ": null,
                "alternativer": [{
                    "id": 1,
                    "tid": "2017-03-07T15:18:24.323",
                    "created": "2017-02-22T15:18:24.323",
                    "sted": "Sannergata 2",
                    "valgt": false
                }, {
                    "id": 2,
                    "tid": "2017-03-09T15:18:24.323",
                    "created": "2017-02-22T15:18:24.323",
                    "sted": "Sannergata 2",
                    "valgt": false
                }]
            }]);
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    "status": "OPPRETTET",
                    "opprettetTidspunkt": new Date("2017-02-22T14:18:24.000"),
                    "bekreftetTidspunkt": null,
                    "deltakere": [{
                        "hendelser": [],
                        "deltakerUuid": "uuid1",
                        "navn": "Are Arbeidsgiver",
                        "orgnummer": "***REMOVED***",
                        "epost": "are.arbeidsgiver@nav.no",
                        "type": "arbeidsgiver",
                        "svartidspunkt": new Date("2017-03-07T14:18:24.000"),
                        "svar": [{
                            "id": 1,
                            "tid": new Date("2017-03-07T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }, {
                            "id": 2,
                            "tid": new Date("2017-03-09T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }]
                    }, {
                        "hendelser": [],
                        "deltakerUuid": "uuid2",
                        "navn": "Sygve Sykmeldt",
                        "orgnummer": null,
                        "epost": null,
                        "type": "Bruker",
                        "svartidspunkt": null,
                        "svar": [{
                            "id": 1,
                            "tid": new Date("2017-03-07T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }, {
                            "id": 2,
                            "tid": new Date("2017-03-09T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }]
                    }],
                    "bekreftetAlternativ": null,
                    "alternativer": [{
                        "id": 1,
                        "tid": new Date("2017-03-07T14:18:24.000"),
                        "created": new Date("2017-02-22T14:18:24.000"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": new Date("2017-03-09T14:18:24.000"),
                        "created": new Date("2017-02-22T14:18:24.000"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }]
                }],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });

        it('Håndterer MOTER_HENTET ved bekreftet møte', () => {
            const initialState = deepFreeze({
                data: [],
                henter: true,
            });
            const action = actions.moterHentet([{
                "status": "BEKREFTET",
                "opprettetTidspunkt": "2017-02-22T15:18:24.323",
                "bekreftetTidspunkt": "2017-02-25T15:18:24.323",
                "deltakere": [{
                    "hendelser": [],
                    "deltakerUuid": "uuid1",
                    "navn": "Are Arbeidsgiver",
                    "orgnummer": "***REMOVED***",
                    "epost": "are.arbeidsgiver@nav.no",
                    "type": "arbeidsgiver",
                    "svartidspunkt": "2017-03-07T15:18:24.323",
                    "svar": [{
                        "id": 1,
                        "tid": "2017-03-07T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": "2017-03-09T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }]
                }, {
                    "hendelser": [],
                    "deltakerUuid": "uuid2",
                    "navn": "Sygve Sykmeldt",
                    "orgnummer": null,
                    "epost": null,
                    "type": "Bruker",
                    "svartidspunkt": null,
                    "svar": [{
                        "id": 1,
                        "tid": "2017-03-07T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": "2017-03-09T15:18:24.323",
                        "created": "2017-02-22T15:18:24.323",
                        "sted": "Sannergata 2",
                        "valgt": false
                    }]
                }],
                "bekreftetAlternativ": {
                    "id": 1,
                    "tid": "2017-03-07T15:18:24.323",
                    "created": "2017-02-22T15:18:24.323",
                    "sted": "Sannergata 2",
                    "valgt": false
                },
                "alternativer": [{
                    "id": 1,
                    "tid": "2017-03-07T15:18:24.323",
                    "created": "2017-02-22T15:18:24.323",
                    "sted": "Sannergata 2",
                    "valgt": false
                }, {
                    "id": 2,
                    "tid": "2017-03-09T15:18:24.323",
                    "created": "2017-02-22T15:18:24.323",
                    "sted": "Sannergata 2",
                    "valgt": false
                }]
            }]);
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    "status": "BEKREFTET",
                    "opprettetTidspunkt": new Date("2017-02-22T14:18:24.000"),
                    "bekreftetTidspunkt": new Date("2017-02-25T14:18:24.000"),
                    "deltakere": [{
                        "hendelser": [],
                        "deltakerUuid": "uuid1",
                        "navn": "Are Arbeidsgiver",
                        "orgnummer": "***REMOVED***",
                        "epost": "are.arbeidsgiver@nav.no",
                        "type": "arbeidsgiver",
                        "svartidspunkt": new Date("2017-03-07T14:18:24.000"),
                        "svar": [{
                            "id": 1,
                            "tid": new Date("2017-03-07T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }, {
                            "id": 2,
                            "tid": new Date("2017-03-09T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }]
                    }, {
                        "hendelser": [],
                        "deltakerUuid": "uuid2",
                        "navn": "Sygve Sykmeldt",
                        "orgnummer": null,
                        "epost": null,
                        "type": "Bruker",
                        "svartidspunkt": null,
                        "svar": [{
                            "id": 1,
                            "tid": new Date("2017-03-07T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }, {
                            "id": 2,
                            "tid": new Date("2017-03-09T14:18:24.000"),
                            "created": new Date("2017-02-22T14:18:24.000"),
                            "sted": "Sannergata 2",
                            "valgt": false
                        }]
                    }],
                    "bekreftetAlternativ": {
                        "id": 1,
                        "tid": new Date("2017-03-07T14:18:24.000"),
                        "created": new Date("2017-02-22T14:18:24.000"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    },
                    "alternativer": [{
                        "id": 1,
                        "tid": new Date("2017-03-07T14:18:24.000"),
                        "created": new Date("2017-02-22T14:18:24.000"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": new Date("2017-03-09T14:18:24.000"),
                        "created": new Date("2017-02-22T14:18:24.000"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }]
                }],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });

        it('Håndterer HENT_MOTER_FEILET', () => {
            const initialState = deepFreeze({});
            const action = actions.hentMoterFeilet();
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentingFeilet: true,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });
    });

    describe('AVBRYT MØTE', () => {
        it('Håndterer AVBRYTER_MOTE', () => {
            const initialState = deepFreeze({
                data: [{
                    'id': 0,
                    'moteUuid': 'b23ee185-cd29-41cb-a109-48d7aad15dc3',
                    'opprettetAv': 'testNAVRessurs',
                    'opprettetTidspunkt': '2016-11-03T13:28:05.244',
                    'navEnhet': 'navEnhet',
                    'deltakere': [{
                        'deltakerUuid': '944c877e-e261-49a4-841e-2ab52349e864',
                        'navn': '***REMOVED***',
                        'epost': '***REMOVED***',
                        'type': 'arbeidsgiver',
                        'avvik': [],
                        'svar': [{
                            'tid': '2012-12-12T11:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false
                        }, {
                            'tid': '2009-09-09T07:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false
                        }]
                    }],
                    'alternativer': [{
                        'tid': '2012-12-12T11:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }, {
                        'tid': '2009-09-09T07:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }]
                }]
            });
            const action = actions.avbryterMote('b23ee185-cd29-41cb-a109-48d7aad15dc3');
            const nextState = moter(initialState, action);
            expect(nextState.avbryter).to.equal(true);
            expect(nextState.avbrytFeilet).to.equal(false);
        });

        it('Håndterer MOTE_AVBRUTT', () => {
            const initialState = deepFreeze({
                data: [{
                    'id': 0,
                    'moteUuid': 'b23ee185-cd29-41cb-a109-48d7aad15dc3',
                    'opprettetAv': 'testNAVRessurs',
                    'opprettetTidspunkt': '2016-11-03T13:28:05.244',
                    'navEnhet': 'navEnhet',
                    'deltakere': [{
                        'deltakerUuid': '944c877e-e261-49a4-841e-2ab52349e864',
                        'navn': '***REMOVED***',
                        'epost': '***REMOVED***',
                        'type': 'arbeidsgiver',
                        'avvik': [],
                        'svar': [{
                            'tid': '2012-12-12T11:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false
                        }, {
                            'tid': '2009-09-09T07:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false
                        }]
                    }],
                    'alternativer': [{
                        'tid': '2012-12-12T11:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }, {
                        'tid': '2009-09-09T07:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }]
                }]
            });
            const action = actions.moteAvbrutt('b23ee185-cd29-41cb-a109-48d7aad15dc3');
            const nextState = moter(initialState, action);
            expect(nextState.data[0].status).to.equal('AVBRUTT');
            expect(nextState.avbrytFeilet).to.equal(false);
            expect(nextState.avbryter).to.equal(false);
        });

        it('Håndterer MOTE_AVBRUTT etterfulgt av MOTE_OPPRETTET', () => {
            const initialState = deepFreeze({
                data: [{"test": 1}]
            });
            const firstAction = actions.moteAvbrutt('3760a0c7-c0df-406b-ba6f-a7da7ad3bfec');
            const nextState = moter(initialState, firstAction);
            const data = getData({
                "deltakere": [
                    {
                        "navn": "***REMOVED***",
                        "epost": "***REMOVED***",
                    }
                ],
                "tidspunkter": [
                    {
                        "dato": "12.08.2016",
                        "klokkeslett": "15.00"
                    },
                    {
                        "dato": "13.08.2016",
                        "klokkeslett": "12.00"
                    }
                ],
                "sted": "Oslo"
            })
            const secondAction = actions.moteOpprettet(data);
            const finalState = moter(nextState, secondAction);
            expect(finalState.data).to.deep.equal([{test: 1}, {
                "alternativer": [{
                    "tid": new Date("2016-08-12T13:00:00.000Z"),
                    "sted": "Oslo",
                    "valgt": false,
                    "created": new Date(),
                }, {
                    "tid": new Date("2016-08-13T10:00:00.000Z"),
                    "sted": "Oslo",
                    "valgt": false,
                    "created": new Date(),
                }],
                "status": "OPPRETTET",
                "deltakere": [{
                    "navn": "***REMOVED***",
                    "epost": "***REMOVED***",
                    "type": "arbeidsgiver",
                    "svar": [{
                        "tid": new Date("2016-08-12T13:00:00.000Z"),
                        "sted": "Oslo",
                        "valgt": false,
                        "created": new Date(),
                    }, {
                        "tid": new Date("2016-08-13T10:00:00.000Z"),
                        "sted": "Oslo",
                        "valgt": false,
                        "created": new Date(),
                    }],
                }],
            }]);
        });

        it('Håndterer AVBRYT_MOTE_FEILET', () => {
            const initialState = deepFreeze({
                data: [{}]
            });
            const action = actions.avbrytMoteFeilet();
            const nextState = moter(initialState, action);
            expect(nextState.avbrytFeilet).to.equal(true);
            expect(nextState.avbryter).to.equal(false);
        });
    });

    describe("BEKREFT MØTE", () => {

        let initialState;

        beforeEach(() => {
            initialState = deepFreeze({
                data: [{
                    foo: 'bar'
                }, {
                    'id': 0,
                    'status': 'OPPRETTET',
                    'moteUuid': 'b23ee185-cd29-41cb-a109-48d7aad15dc3',
                    'opprettetAv': 'testNAVRessurs',
                    'opprettetTidspunkt': '2016-11-03T13:28:05.244',
                    'navEnhet': 'navEnhet',
                    'deltakere': [{
                        'deltakerUuid': '944c877e-e261-49a4-841e-2ab52349e864',
                        'navn': '***REMOVED***',
                        'epost': '***REMOVED***',
                        'type': 'arbeidsgiver',
                        'avvik': [],
                        'svar': [{
                            'tid': '2012-12-12T11:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false,
                            'id': 6
                        }, {
                            'tid': '2009-09-09T07:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false,
                            'id': 7
                        }]
                    }],
                    'alternativer': [{
                        'id': 6,
                        'tid': '2012-12-12T11:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }, {
                        'id': 7,
                        'tid': '2009-09-09T07:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }]
                }]
            });
        })

        it("Håndterer BEKREFTER_MOTE", () => {
            const action = actions.bekrefterMote();
            let nextState = moter(initialState, action);
            expect(nextState.data).to.deep.equal(initialState.data);
            expect(nextState.bekrefter).to.be.true;
            expect(nextState.bekreftFeilet).to.be.false;
            expect(nextState.avbryter).to.be.false;
            expect(nextState.avbrytFeilet).to.be.false;
        });

        it("Håndterer MOTE_BEKREFTET", () => {
            const action = actions.moteBekreftet('b23ee185-cd29-41cb-a109-48d7aad15dc3', 6, '2016-11-03T13:28:05.244');
            let nextState = moter(initialState, action);
            expect(nextState.avbryter).to.be.false;
            expect(nextState.avbrytFeilet).to.be.false;
            expect(nextState.data).to.deep.equal([{
                'foo': 'bar'
            },
                {
                    'id': 0,
                    'status': 'BEKREFTET',
                    'moteUuid': 'b23ee185-cd29-41cb-a109-48d7aad15dc3',
                    'opprettetAv': 'testNAVRessurs',
                    'opprettetTidspunkt': '2016-11-03T13:28:05.244',
                    'navEnhet': 'navEnhet',
                    "bekreftetTidspunkt": new Date('2016-11-03T13:28:05.244'),
                    'deltakere': [{
                        'deltakerUuid': '944c877e-e261-49a4-841e-2ab52349e864',
                        'navn': '***REMOVED***',
                        'epost': '***REMOVED***',
                        'type': 'arbeidsgiver',
                        'avvik': [],
                        'svar': [{
                            'tid': '2012-12-12T11:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false,
                            'id': 6
                        }, {
                            'tid': '2009-09-09T07:00:00Z',
                            'sted': 'Oslo by',
                            'valgt': false,
                            'id': 7
                        }]
                    }],
                    'bekreftetAlternativ': {
                        'id': 6,
                        'tid': '2012-12-12T11:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    },
                    'alternativer': [{
                        'id': 6,
                        'tid': '2012-12-12T11:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }, {
                        'id': 7,
                        'tid': '2009-09-09T07:00:00Z',
                        'sted': 'Oslo by',
                        'valgt': false
                    }]
                }]);
        });

        it("Håndterer bekreftMoteFeilet()", () => {
            const action = actions.bekreftMoteFeilet();
            let nextState = moter(initialState, action);
            expect(nextState.bekrefter).to.be.false;
            expect(nextState.bekreftFeilet).to.be.true;
        });

        it("Håndterer bekreftMote()", () => {
            const action = actions.bekreftMote('b23ee185-cd29-41cb-a109-48d7aad15dc3', 6);
            let nextState = moter(initialState, action);
            expect(nextState).to.deep.equal(initialState);
        });

    });

    describe("FLERE ALTERNATIVER", () => {

        let mote;
        let initialState;

        beforeEach(() => {
            mote = getMote();
        });

        it("Håndterer opprettFlereAlternativBekreftet", () => {
            let initialState = deepFreeze({
                data: [mote]
            });
            const data = [{
                "tid": "2017-03-09T10:00:00.000",
                "sted": "Sannergata 2",
                "valgt": false,
            }, {
                "tid": "2017-03-10T10:00:00.000",
                "sted": "Sannergata 2",
                "valgt": false,
            }];
            const action = actions.opprettFlereAlternativBekreftet(data, "min-mote-uuid");
            const nextState = moter(initialState, action);

            expect(nextState.antallNyeTidspunkt).to.be.undefined;
            expect(nextState.nyeAlternativFeilet).to.be.false;
            expect(nextState.senderNyeAlternativ).to.be.false;
            expect(nextState.data).to.deep.equal([{
                "status": "OPPRETTET",
                'moteUuid': 'min-mote-uuid',
                "opprettetTidspunkt": new Date("2017-02-22T15:18:24.323"),
                "bekreftetTidspunkt": null,
                "deltakere": [{
                    "hendelser": [],
                    "deltakerUuid": "uuid1",
                    "navn": "Are Arbeidsgiver",
                    "orgnummer": "***REMOVED***",
                    "epost": "are.arbeidsgiver@nav.no",
                    "type": "arbeidsgiver",
                    "svartidspunkt": null,
                    "svar": [{
                        "id": 1,
                        "tid": new Date("2017-03-07T15:18:24.323"),
                        "created": new Date("2017-02-22T15:18:24.323"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": new Date("2017-03-09T15:18:24.323"),
                        "created": new Date("2017-02-22T15:18:24.323"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 3,
                        "tid": new Date("2017-02-25T15:18:24.323"),
                        "created": new Date("2017-02-22T15:18:24.323"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 4,
                        "tid": new Date("2017-03-09T10:00:00.000"),
                        "created": new Date(),
                        "sted": "Sannergata 2",
                        "valgt": false,
                    }, {
                        "id": 5,
                        "tid": new Date("2017-03-10T10:00:00.000"),
                        "created": new Date(),
                        "sted": "Sannergata 2",
                        "valgt": false,
                    }]
                }, {
                    "hendelser": [],
                    "deltakerUuid": "uuid2",
                    "navn": "Sygve Sykmeldt",
                    "orgnummer": null,
                    "epost": null,
                    "type": "Bruker",
                    "svartidspunkt": null,
                    "svar": [{
                        "id": 1,
                        "tid": new Date("2017-03-07T15:18:24.323"),
                        "created": new Date("2017-02-22T15:18:24.323"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 2,
                        "tid": new Date("2017-03-09T15:18:24.323"),
                        "created": new Date("2017-02-22T15:18:24.323"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 3,
                        "tid": new Date("2017-02-25T15:18:24.323"),
                        "created": new Date("2017-02-22T15:18:24.323"),
                        "sted": "Sannergata 2",
                        "valgt": false
                    }, {
                        "id": 4,
                        "tid": new Date("2017-03-09T10:00:00.000"),
                        "created": new Date(),
                        "sted": "Sannergata 2",
                        "valgt": false,
                    }, {
                        "id": 5,
                        "tid": new Date("2017-03-10T10:00:00.000"),
                        "created": new Date(),
                        "sted": "Sannergata 2",
                        "valgt": false,
                    }]
                }],
                "bekreftetAlternativ": null,
                "alternativer": [{
                    "id": 1,
                    "tid": new Date("2017-03-07T15:18:24.323"),
                    "created": new Date("2017-02-22T15:18:24.323"),
                    "sted": "Sannergata 2",
                    "valgt": false
                }, {
                    "id": 2,
                    "tid": new Date("2017-02-25T15:18:24.323"),
                    "created": new Date("2017-02-22T15:18:24.323"),
                    "sted": "Sannergata 2",
                    "valgt": false
                }, {
                    "id": 3,
                    "tid": new Date("2017-02-25T15:18:24.323"),
                    "created": new Date("2017-02-22T15:18:24.323"),
                    "sted": "Sannergata 2",
                    "valgt": false
                }, {
                    "id": 4,
                    "tid": new Date("2017-03-09T10:00:00.000"),
                    "created": new Date(),
                    "sted": "Sannergata 2",
                    "valgt": false,
                }, {
                    "id": 5,
                    "tid": new Date("2017-03-10T10:00:00.000"),
                    "created": new Date(),
                    "sted": "Sannergata 2",
                    "valgt": false,
                }]
            }])
        })

    })

});
