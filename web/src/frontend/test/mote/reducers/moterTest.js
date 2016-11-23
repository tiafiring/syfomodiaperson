import { expect } from 'chai';
import moter from '../../../js/mote/reducers/moter';
import * as actions from '../../../js/mote/actions/moter_actions';
import deepFreeze from 'deep-freeze';

describe('moter', () => {

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
            const action = actions.moteOpprettet({
                'test': 'OK',
                'fnr': 'hei',
            });
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    'test': 'OK',
                    'fnr': 'hei',
                    'status': 'OPPRETTET'
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
                data: [{}],
                henter: true,
            });
            const action = actions.moterHentet([{
                id: 1
            }]);
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    id: 1
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
                data: [{
                    'id': 4,
                    'moteUuid': '3760a0c7-c0df-406b-ba6f-a7da7ad3bfec',
                    'opprettetAv': 'Z990322',
                    'status': 'OPPRETTET',
                    'opprettetTidspunkt': '2016-11-17T12:57:01.263',
                    'navEnhet': 'navEnhet',
                    'deltakere': [{
                        'deltakerUuid': '11ccb710-e018-47dc-9a12-79263b414276',
                        'navn': 'Oslo',
                        'epost': 'oslo@oslo.no',
                        'type': 'arbeidsgiver',
                        'svartTidspunkt': '2016-11-17T12:57:16.597',
                        'avvik': [],
                        'svar': [{
                            'tid': '2020-12-12T11:00:00Z',
                            'sted': 'Oslo',
                            'valgt': false
                        }, {
                            'tid': '2010-12-12T09:00:00Z',
                            'sted': 'Oslo',
                            'valgt': true
                        }]
                    }],
                    'alternativer': [{
                        'tid': '2020-12-12T11:00:00Z',
                        'sted': 'Oslo',
                        'valgt': false
                    }, {
                        'tid': '2010-12-12T09:00:00Z',
                        'sted': 'Oslo',
                        'valgt': false
                    }]
                }]
            });
            const firstAction = actions.moteAvbrutt('3760a0c7-c0df-406b-ba6f-a7da7ad3bfec');
            const nextState = moter(initialState, firstAction);
            const secondAction = actions.moteOpprettet({
                "alternativer": [{
                    "tid": "2026-09-19T08:00:00.000Z",
                    "sted": "Oslo",
                    "valgt": false
                }, {
                    "tid": "2027-09-19T10:00:00.000Z",
                    "sted": "Oslo",
                    "valgt": false
                }],
                "deltakere": [{
                    "navn": "***REMOVED***",
                    "epost": "***REMOVED***",
                    "type": "arbeidsgiver",
                    "svar": [{
                        "tid": "2026-09-19T08:00:00.000Z",
                        "sted": "Oslo",
                        "valgt": false
                    }, {
                        "tid": "2027-09-19T10:00:00.000Z",
                        "sted": "Oslo",
                        "valgt": false
                    }],
                    "avvik": []
                }],
                "fnr": "08028447516"
            });
            const finalState = moter(nextState, secondAction);
            expect(finalState.data).to.deep.equal([{
                'id': 4,
                'moteUuid': '3760a0c7-c0df-406b-ba6f-a7da7ad3bfec',
                'opprettetAv': 'Z990322',
                'status': 'AVBRUTT',
                'opprettetTidspunkt': '2016-11-17T12:57:01.263',
                'navEnhet': 'navEnhet',
                'deltakere': [{
                    'deltakerUuid': '11ccb710-e018-47dc-9a12-79263b414276',
                    'navn': 'Oslo',
                    'epost': 'oslo@oslo.no',
                    'type': 'arbeidsgiver',
                    'svartTidspunkt': '2016-11-17T12:57:16.597',
                    'avvik': [],
                    'svar': [{
                        'tid': '2020-12-12T11:00:00Z',
                        'sted': 'Oslo',
                        'valgt': false
                    }, {
                        'tid': '2010-12-12T09:00:00Z',
                        'sted': 'Oslo',
                        'valgt': true
                    }]
                }],
                'alternativer': [{
                    'tid': '2020-12-12T11:00:00Z',
                    'sted': 'Oslo',
                    'valgt': false
                }, {
                    'tid': '2010-12-12T09:00:00Z',
                    'sted': 'Oslo',
                    'valgt': false
                }]
            }, {
                "alternativer": [{
                    "tid": "2026-09-19T08:00:00.000Z",
                    "sted": "Oslo",
                    "valgt": false
                }, {
                    "tid": "2027-09-19T10:00:00.000Z",
                    "sted": "Oslo",
                    "valgt": false
                }],
                "status": "OPPRETTET",
                "deltakere": [{
                    "navn": "***REMOVED***",
                    "epost": "***REMOVED***",
                    "type": "arbeidsgiver",
                    "svar": [{
                        "tid": "2026-09-19T08:00:00.000Z",
                        "sted": "Oslo",
                        "valgt": false
                    }, {
                        "tid": "2027-09-19T10:00:00.000Z",
                        "sted": "Oslo",
                        "valgt": false
                    }],
                    "avvik": []
                }],
                "fnr": "08028447516"
            }]);
        });

        it('Håndterer AVBRYT_MOTE_FEILET', () => {
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
            const action = actions.moteBekreftet('b23ee185-cd29-41cb-a109-48d7aad15dc3', 6);
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
                'valgtAlternativ': {
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

});
