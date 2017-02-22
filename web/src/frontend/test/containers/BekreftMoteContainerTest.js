import React from "react";
import {expect} from "chai";
import {mount, shallow, render} from "enzyme";
import {mapStateToProps, BekreftMoteSide} from "../../js/containers/BekreftMoteContainer";
import BekreftMote from "../../js/mote/components/BekreftMote";
import sinon from "sinon";

describe("BekreftMoteContainer", () => {

    describe("BekreftMoteSide", () => {

        let hentMoter;
        let bekreftMote;
        let deltaker;

        beforeEach(() => {
            hentMoter = sinon.spy();
            bekreftMote = sinon.spy();
            ledetekster = sinon.spy();
            deltaker = {
                deltakerUuid: "123"
            }
        })

        it("Skal ha en onSubmit-funksjon som kaller på bekreftMote() med riktige argumenter", () => {
            const mote = {
                moteUuid: "Olsen",
                deltakere: [{
                    type: "Bruker"
                },
                    {
                        type: "arbeidsgiver",
                        deltakerUuid: "uuid1",
                    }]
            };
            const alternativ = {
                id: 4545
            }
            const compo = shallow(<BekreftMoteSide fnr="***REMOVED***" hentBekreftMoteEpostinnhold={() => {}} bekreftMote={bekreftMote} alternativ={alternativ} mote={mote} arbeidsgiver={deltaker} />);
            compo.instance().onSubmit();
            expect(bekreftMote.getCall(0).args).to.deep.equal(["Olsen", 4545, "***REMOVED***"]);
        });

        describe("Dersom alternativ finnes", () => {

            let compo;

            beforeEach(() => {
                const alternativ = {
                    "id": 328,
                    "tid": "2020-12-12T11:00:00Z",
                    "sted": "Oslo ",
                    "valgt": false
                };
                const mote = {
                    status: "OPPRETTET",
                    moteUuid: "123"
                }
                compo = shallow(<BekreftMoteSide hentMoter={hentMoter} alternativ={alternativ} mote={mote} deltaker={deltaker} />)
            })
        });

        describe("Dersom alternativ ikke finnes", () => {

            let compo; 

            beforeEach(() => {
                compo = shallow(<BekreftMoteSide hentMoter={hentMoter} deltaker={deltaker} fnr="5566" />)
            })

            it("Skal hente møter", () => {
                expect(hentMoter.calledWith("5566")).to.be.true;
            });

        });

        describe("Når alternativ finnes", () => {

            let compo;
            let mote;
            let alternativ

            beforeEach(() => {
                alternativ = {
                    "id": 328,
                    "tid": "2020-12-12T11:00:00Z",
                    "sted": "Oslo ",
                    "valgt": false
                };
                mote = {
                    moteUuid: "123",
                    status: "OPPRETTET",
                    deltakere: [{
                        type: "Bruker"
                    }, {
                        type: "arbeidsgiver",
                        deltakerUuid: "uuid",
                    }]
                }
                compo = shallow(<BekreftMoteSide hentBekreftMoteEpostinnhold={ () => {} } hentMoter={hentMoter} alternativ={alternativ} mote={mote} deltaker={deltaker} />)
            })


            it("Skal vise BekreftMote", () => {
                expect(compo.find(BekreftMote)).to.have.length(1);
                expect(typeof compo.find(BekreftMote).prop("onSubmit")).to.equal("function");
                expect(compo.find(BekreftMote).prop("deltaker")).to.deep.equal(deltaker)
            });

        });

    });

    describe("mapStateToProps", () => {

        let state;

        beforeEach(() => {
            ownProps = {
                params: {
                    alternativId: "328"
                }
            };
            state = {
                ledetekster: { henter: false, data: {} },
                epostinnhold: { henter: false, data: {} },
                moter: {
                    data: [{
                        "id": 1,
                        "moteUuid": "2fedc0da-efec-4b6e-8597-a021628058ae",
                        "opprettetAv": "Z990562",
                        "status": "OPPRETTET",
                        "opprettetTidspunkt": "2016-11-21T11:35:51.870Z",
                        "navEnhet": "navEnhet",
                        "deltakere": [{
                            "deltakerUuid": "85a12263-d955-4103-b172-bf135df5f37a",
                            "navn": "***REMOVED***",
                            "epost": "***REMOVED***",
                            "type": "arbeidsgiver",
                            "avvik": [],
                            "svar": [{
                                "id": 328,
                                "tid": "2020-12-12T11:00:00Z",
                                "sted": "Oslo ",
                                "valgt": false
                            }, {
                                "id": 329,
                                "tid": "2020-09-09T07:00:00Z",
                                "sted": "Oslo ",
                                "valgt": false
                            }]
                        }, {
                            "deltakerUuid": "85a12263-d955-4103-b172-bf135df5f37b",
                            "navn": "Andreas Arbeidstaker",
                            "epost": "***REMOVED***",
                            "type": "Bruker",
                            "avvik": [],
                            "svar": [{
                                "id": 330,
                                "tid": "2020-12-12T11:00:00Z",
                                "sted": "Oslo ",
                                "valgt": false
                            }, {
                                "id": 331,
                                "tid": "2020-09-09T07:00:00Z",
                                "sted": "Oslo ",
                                "valgt": false
                            }]
                        }],
                        "alternativer": [{
                            "id": 328,
                            "tid": "2020-12-12T11:00:00Z",
                            "sted": "Oslo ",
                            "valgt": false
                        }, {
                            "id": 329,
                            "tid": "2020-09-09T07:00:00Z",
                            "sted": "Oslo ",
                            "valgt": false
                        }]
                    }]
                },
                navbruker: {
                    data: {
                        fnr: "123"
                    }
                }
            }
        });

        it("Skal returnere mote", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.mote.moteUuid).to.equal("2fedc0da-efec-4b6e-8597-a021628058ae")
        });

        it("Skal returnere mote når mote.status === 'BEKREFTET'", () => {
            state.moter.data[0].status = 'BEKREFTET';
            const props = mapStateToProps(state, ownProps);
            expect(props.mote.moteUuid).to.equal("2fedc0da-efec-4b6e-8597-a021628058ae") 
        })

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("123")
        })

        it("Skal returnere alternativ", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.alternativ).to.deep.equal({
                "id": 328,
                "tid": "2020-12-12T11:00:00Z",
                "sted": "Oslo ",
                "valgt": false
            });
        });

        it("Skal returnere deltaker", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.deltaker).to.deep.equal({
                "deltakerUuid": "85a12263-d955-4103-b172-bf135df5f37a",
                "navn": "***REMOVED***",
                "epost": "***REMOVED***",
                "type": "arbeidsgiver",
                "avvik": [],
                "svar": [{
                    "id": 328,
                    "tid": "2020-12-12T11:00:00Z",
                    "sted": "Oslo ",
                    "valgt": false
                }, {
                    "id": 329,
                    "tid": "2020-09-09T07:00:00Z",
                    "sted": "Oslo ",
                    "valgt": false
                }]
            });
        })

        it("Skal returnere henterMoterBool når det hentes møter", () => {
            state.moter.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henterMoterBool).to.be.true;
        });
    });

});