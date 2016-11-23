import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import MotestatusContainer from '../../js/mote/containers/MotestatusContainer';
import { mapStateToProps, BekreftMoteSide } from '../../js/containers/BekreftMoteContainer';
import AppSpinner from '../../js/components/AppSpinner';
import BekreftMote from '../../js/mote/components/BekreftMote';
import sinon from 'sinon';

describe("BekreftMoteContainer", () => {

    describe("BekreftMoteSide", () => {

        let hentBekreftMoteEpostInnhold;
        let hentMoter;
        let bekreftMote;
        let deltaker;

        beforeEach(() => {
            hentBekreftMoteEpostInnhold = sinon.spy();
            hentMoter = sinon.spy();
            bekreftMote = sinon.spy();
            deltaker = {
                deltakerUuid: "123"
            }
        })

        it("Skal ha en onSubmit-funksjon som kaller på bekreftMote() med riktige argumenter", () => {
            const mote = {
                moteUuid: "Olsen",
            };
            const alternativ = {
                id: 4545
            }
            const compo = shallow(<BekreftMoteSide fnr="***REMOVED***" bekreftMote={bekreftMote} alternativ={alternativ} mote={mote} deltaker={deltaker} hentBekreftMoteEpostInnhold={hentBekreftMoteEpostInnhold} />);
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
                compo = shallow(<BekreftMoteSide hentMoter={hentMoter} hentBekreftMoteEpostInnhold={hentBekreftMoteEpostInnhold} alternativ={alternativ} mote={mote} deltaker={deltaker} />)
            })

            it("Skal kalle på hentBekreftMoteEpostInnhold", () => {
                expect(hentBekreftMoteEpostInnhold.calledWith("123", 328)).to.be.true;
                expect(hentMoter.called).to.be.false
            });

        });

        describe("Dersom alternativ ikke finnes", () => {

            let compo; 

            beforeEach(() => {
                compo = shallow(<BekreftMoteSide hentMoter={hentMoter} hentBekreftMoteEpostInnhold={hentBekreftMoteEpostInnhold} deltaker={deltaker} fnr="5566" />)
            })

            it("Skal hente møter", () => {
                expect(hentMoter.calledWith("5566")).to.be.true;
            });

            it("Skal dernest hente epostinnhold og vise spinner", () => {
                compo.setProps({
                    alternativ: {
                        "id": 328,
                        "tid": "2020-12-12T11:00:00Z",
                        "sted": "Oslo ",
                        "valgt": false
                    }, 
                    mote: {
                        moteUuid: "8877",
                        status: "OPPRETTET",
                    }
                });
                compo.instance().componentDidUpdate({});
                expect(hentBekreftMoteEpostInnhold.calledOnce).to.be.true;
                expect(hentBekreftMoteEpostInnhold.getCall(0).args).to.deep.equal(["123", 328])
                expect(compo.find(AppSpinner)).to.have.length(1);
            });

        });

        describe("Når alternativ og epostinnhold finnes", () => {

            let compo;
            let epostinnhold;
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
                }
                epostinnhold = {
                    emne: "1",
                    innhold: "2"
                }
                compo = shallow(<BekreftMoteSide epostinnhold={epostinnhold} hentMoter={hentMoter} hentBekreftMoteEpostInnhold={hentBekreftMoteEpostInnhold} alternativ={alternativ} mote={mote} deltaker={deltaker} />)
            })


            it("Skal vise BekreftMote", () => {
                expect(compo.find(BekreftMote)).to.have.length(1);
                expect(compo.find(BekreftMote).prop("epostinnhold")).to.deep.equal(epostinnhold);
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
                epostinnhold: {

                },
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

        it("Skal returnere henterEpostinnholdBool når det hentes epostinnhold", () => {
            state.epostinnhold.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henterEpostinnholdBool).to.be.true;
        });

        it("Skal returnere epostinnhold når eposttype = 'BEKREFT_TIDSPUNKT'", () => {
            state.epostinnhold.data = {
                emne: "1",
                innhold: "2"
            };
            state.epostinnhold.eposttype = "BEKREFT_TIDSPUNKT";
            const props = mapStateToProps(state, ownProps);
            expect(props.epostinnhold).to.deep.equal({
                emne: "1",
                innhold: "2"
            })
        });

        it("Skal returnere epostinnhold når eposttype = 'OLSEN'", () => {
            state.epostinnhold.data = {
                emne: "1",
                innhold: "2"
            };
            state.epostinnhold.eposttype = "OLSEN";
            const props = mapStateToProps(state, ownProps);
            expect(props.epostinnhold).to.be.undefined;
        });

    });

});