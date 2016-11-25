import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import MotestatusContainer from '../../js/mote/containers/MotestatusContainer';
import { mapStateToProps, AvbrytMoteSide } from '../../js/containers/AvbrytMoteContainer';
import AppSpinner from '../../js/components/AppSpinner';
import AvbrytMote from '../../js/mote/components/AvbrytMote';
import sinon from 'sinon';
import Lightbox from '../../js/components/Lightbox'

describe("AvbrytMoteContainer", () => {

    describe("AvbrytMoteSide", () => {

        let hentAvbrytMoteEpostinnhold;
        let hentMoter;
        let mote;

        beforeEach(() => {
            mote = {
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
            };
            hentAvbrytMoteEpostinnhold = sinon.spy();
            hentMoter = sinon.spy();
        });

        it("Skal hente møte dersom det ikke finnes møte", () => {
            const compo = shallow(<AvbrytMoteSide fnr="123" hentMoter={hentMoter} />);
            expect(hentMoter.getCall(0).args).to.deep.equal(["123"]);
        })

        it("Skal hente epostinnhold dersom det ikke finnes epostinnhold og møte", () => {
            const compo = shallow(<AvbrytMoteSide mote={mote} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(hentAvbrytMoteEpostinnhold.getCall(0).args).to.deep.equal(["85a12263-d955-4103-b172-bf135df5f37a"])
        });

        it("Skal ikke hente epostinnhold dersom det finnes epostinnhold og møte", () => {
            const epostinnhold = {emne: "1"}
            const compo = shallow(<AvbrytMoteSide epostinnhold={epostinnhold} mote={mote} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(hentAvbrytMoteEpostinnhold.called).to.be.false;
        });

        it("Skal ikke hente epostinnhold dersom det ikke finnes epostinnhold men heller ikke noe møte", () => {
            const epostinnhold = undefined;
            const mote = undefined;
            const compo = shallow(<AvbrytMoteSide hentMoter={hentMoter} epostinnhold={epostinnhold} mote={mote} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(hentAvbrytMoteEpostinnhold.called).to.be.false;
        });

        it("Skal hente epostinnhold når møtet oppdateres med møteUuid", () => {
            const epostinnhold = undefined;
            const moteParam = undefined;
            const compo = shallow(<AvbrytMoteSide hentMoter={hentMoter} epostinnhold={epostinnhold} mote={moteParam} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(hentAvbrytMoteEpostinnhold.called).to.be.false;
            compo.setProps({
                mote,
            });
            compo.instance().componentDidUpdate();
            expect(hentAvbrytMoteEpostinnhold.getCall(0).args).to.deep.equal(["85a12263-d955-4103-b172-bf135df5f37a"])
        });

        it("Skal vise frem AppSpinner når det hentes møter", () => {
            const compo = shallow(<AvbrytMoteSide hentMoter={hentMoter} henterMoterBool={true} />);
            expect(compo.contains(<AppSpinner />)).to.be.true;
        });

        it("Skal vise frem Lightbox når møte er hentet", () => {
            const compo = shallow(<AvbrytMoteSide henterMoterBool={false} mote={mote} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(compo.find(Lightbox)).to.have.length(1);
        });

        it("Skal vise frem AppSpinner når epostinnhold hentes", () => {
            const compo = shallow(<AvbrytMoteSide mote={mote} henterEpostinnholdBool={true} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(compo.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise frem AvbrytMote når epostinnhold er hentet", () => {
            const epostinnhold = {
                emne: "1",
                innhold: "2"
            }
            const avbrytMote = sinon.spy();
            const compo = shallow(<AvbrytMoteSide avbrytMote={avbrytMote} mote={mote} epostinnhold={epostinnhold} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(compo.find(AvbrytMote)).to.have.length(1);
            expect(compo.find(AvbrytMote).prop("epostinnhold")).to.deep.equal(epostinnhold);
            expect(compo.find(AvbrytMote).prop("deltaker")).to.deep.equal(mote.deltakere[0]);
        });

        it("Skal ha en avbrytMote-funksjon som kaller på riktig funksjon", () => {
            const epostinnhold = {
                emne: "1",
                innhold: "2"
            }
            const avbrytMote = sinon.spy();
            const compo = shallow(<AvbrytMoteSide fnr="8855" avbrytMote={avbrytMote} mote={mote} epostinnhold={epostinnhold} hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold} />);
            expect(compo.instance().avbrytMote());
            expect(avbrytMote.getCall(0).args).to.deep.equal(["2fedc0da-efec-4b6e-8597-a021628058ae", "8855"])
        })

    });

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            ownProps = {
                params: {
                    moteUuid: "2fedc0da-efec-4b6e-8597-a021628058ae"
                }
            }
            state = {
                epostinnhold: {
                    hentingFeilet: false,
                },
                moter: {
                    hentingFeilet: false,
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
            };

        });

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("123");
        });

        it("Skal returnere møte", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.mote).to.deep.equal(state.moter.data[0]);
        });

        it("Skal returnere epostinnhold når eposttype = 'AVBRYT_TIDSPUNKT'", () => {
            state.epostinnhold.data = {
                emne: "1",
                innhold: "2"
            };
            state.epostinnhold.eposttype = "AVBRYT_TIDSPUNKT";
            const props = mapStateToProps(state, ownProps);
            expect(props.epostinnhold).to.deep.equal({
                emne: "1",
                innhold: "2"
            });
        });

        it("Skal returnere henterMoterBool når det hentes møter", () => {
            state.moter.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henterMoterBool).to.equal(true);

            state.moter.henter = false;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.henterMoterBool).to.equal(false);
        });

        it("Skal returnere henterEpostinnholdBool når det hentes epost", () => {
            state.epostinnhold.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henterEpostinnholdBool).to.equal(true);

            state.epostinnhold.henter = false;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.henterEpostinnholdBool).to.equal(false);
        });


        it("Skal returnere hentingFeilet når henting av møter feilet", () => {
            state.moter.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.hentingFeiletBool).to.equal(true);

            state.moter.hentingFeilet = false;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.hentingFeiletBool).to.equal(false);
        });

        it("Skal returnere hentingFeilet når henting av epost feiler", () => {
            state.epostinnhold.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.hentingFeiletBool).to.equal(true);

            state.epostinnhold.hentingFeilet = false;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.hentingFeiletBool).to.equal(false);
        });

    });

});