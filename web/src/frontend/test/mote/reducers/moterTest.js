import { expect } from 'chai';
import moter from '../../../js/mote/reducers/moter';
import * as actions from '../../../js/mote/actions/moter_actions';
import deepFreeze from 'deep-freeze'; 

describe("moter", () => {

    describe("OPPRETT MØTE", () => {
        it("Håndterer OPPRETTER_MOTE", () => {
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

        it("Håndterer MOTE_OPPRETTET", () => {
            const initialState = deepFreeze({
                data: []
            });
            const action = actions.moteOpprettet({
                "test": "OK"
            }, "hei")
            const nextState = moter(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    "test": "OK",
                    "fnr": "hei"
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        });

        it("Håndterer OPPRETT_MOTE_FEILET", () => {
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
    })

    describe("HENT MØTER", () => {
        it("Håndterer HENTER_MOTER", () => {
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
            })
        });

        it("Håndterer MOTER_HENTET", () => {
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
            })
        });

        it("Håndterer HENT_MOTER_FEILET", () => {
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

    describe("AVBRYT MØTE", () => {
        it("Håndterer AVBRYTER_MOTE", () => {
            const initialState = deepFreeze({
                data: [{
                    "id": 0,
                    "moteUuid": "b23ee185-cd29-41cb-a109-48d7aad15dc3",
                    "opprettetAv": "testNAVRessurs",
                    "opprettetTidspunkt": "2016-11-03T13:28:05.244",
                    "navEnhet": "navEnhet",
                    "deltakere": [{
                        "deltakerUuid": "944c877e-e261-49a4-841e-2ab52349e864",
                        "navn": "***REMOVED***",
                        "epost": "***REMOVED***",
                        "type": "arbeidsgiver",
                        "avvik": [],
                        "tidOgSted": [{
                            "tid": "2012-12-12T11:00:00Z",
                            "sted": "Oslo by",
                            "valgt": false
                        }, {
                            "tid": "2009-09-09T07:00:00Z",
                            "sted": "Oslo by",
                            "valgt": false
                        }]
                    }],
                    "tidOgStedAlternativer": [{
                        "tid": "2012-12-12T11:00:00Z",
                        "sted": "Oslo by",
                        "valgt": false
                    }, {
                        "tid": "2009-09-09T07:00:00Z",
                        "sted": "Oslo by",
                        "valgt": false
                    }]
                }]
            });
            const action = actions.avbryterMote("b23ee185-cd29-41cb-a109-48d7aad15dc3");
            const nextState = moter(initialState, action);
            expect(nextState.avbryter).to.equal(true);
            expect(nextState.avbrytFeilet).to.equal(false);
        });

        it("Håndterer MOTE_AVBRUTT", () => {
            const initialState = deepFreeze({
                data: [{
                    "id": 0,
                    "moteUuid": "b23ee185-cd29-41cb-a109-48d7aad15dc3",
                    "opprettetAv": "testNAVRessurs",
                    "opprettetTidspunkt": "2016-11-03T13:28:05.244",
                    "navEnhet": "navEnhet",
                    "deltakere": [{
                        "deltakerUuid": "944c877e-e261-49a4-841e-2ab52349e864",
                        "navn": "***REMOVED***",
                        "epost": "***REMOVED***",
                        "type": "arbeidsgiver",
                        "avvik": [],
                        "tidOgSted": [{
                            "tid": "2012-12-12T11:00:00Z",
                            "sted": "Oslo by",
                            "valgt": false
                        }, {
                            "tid": "2009-09-09T07:00:00Z",
                            "sted": "Oslo by",
                            "valgt": false
                        }]
                    }],
                    "tidOgStedAlternativer": [{
                        "tid": "2012-12-12T11:00:00Z",
                        "sted": "Oslo by",
                        "valgt": false
                    }, {
                        "tid": "2009-09-09T07:00:00Z",
                        "sted": "Oslo by",
                        "valgt": false
                    }]
                }]
            });
            const action = actions.moteAvbrutt("b23ee185-cd29-41cb-a109-48d7aad15dc3");
            const nextState = moter(initialState, action);
            expect(nextState.data[0].status).to.equal('AVBRUTT');
            expect(nextState.avbrytFeilet).to.equal(false);
            expect(nextState.avbryter).to.equal(false);
        });

        it("Håndterer AVBRYT_MOTE_FEILET", () => {
            const initialState = deepFreeze({
                data: [{
                    "id": 0,
                    "moteUuid": "b23ee185-cd29-41cb-a109-48d7aad15dc3",
                    "opprettetAv": "testNAVRessurs",
                    "opprettetTidspunkt": "2016-11-03T13:28:05.244",
                    "navEnhet": "navEnhet",
                    "deltakere": [{
                        "deltakerUuid": "944c877e-e261-49a4-841e-2ab52349e864",
                        "navn": "***REMOVED***",
                        "epost": "***REMOVED***",
                        "type": "arbeidsgiver",
                        "avvik": [],
                        "tidOgSted": [{
                            "tid": "2012-12-12T11:00:00Z",
                            "sted": "Oslo by",
                            "valgt": false
                        }, {
                            "tid": "2009-09-09T07:00:00Z",
                            "sted": "Oslo by",
                            "valgt": false
                        }]
                    }],
                    "tidOgStedAlternativer": [{
                        "tid": "2012-12-12T11:00:00Z",
                        "sted": "Oslo by",
                        "valgt": false
                    }, {
                        "tid": "2009-09-09T07:00:00Z",
                        "sted": "Oslo by",
                        "valgt": false
                    }]
                }]
            });
            const action = actions.avbrytMoteFeilet();
            const nextState = moter(initialState, action);
            expect(nextState.avbrytFeilet).to.equal(true);
            expect(nextState.avbryter).to.equal(false);
        });
    })

});