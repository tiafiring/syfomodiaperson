import React from "react";
import {expect} from "chai";
import {mount, shallow, render} from "enzyme";
import sinon from "sinon";
import AppSpinner from "../../../js/components/AppSpinner";
import {mapStateToProps, MotebookingSkjemaContainer} from "../../../js/mote/containers/MotebookingSkjemaContainer";

describe("MotebookingSkjemaContainer", () => {

    describe("MotebookingSkjemaContainer", () => {

        let hentLedere;
        let hentArbeidstaker;

        beforeEach(() => {
            hentLedere = sinon.spy();
            hentArbeidstaker = sinon.spy();
        })

        it("Skal hente ledere", () => {
            var compo = shallow(<MotebookingSkjemaContainer hentLedere={hentLedere} hentArbeidstaker={hentArbeidstaker} fnr="123" />);
            expect(hentLedere.calledWith("123")).to.be.true;
        });

        it("Skal hente arbeidstaker", () => {
            var compo = shallow(<MotebookingSkjemaContainer hentLedere={hentLedere} hentArbeidstaker={hentArbeidstaker} fnr="123" />);
            expect(hentArbeidstaker.calledWith("123")).to.be.true;
        });

        it("Skal vise spinner dersom noe hentes", () => {
            var compo = shallow(<MotebookingSkjemaContainer henter hentLedere={hentLedere} hentArbeidstaker={hentArbeidstaker} fnr="123" />);
            expect(compo.find(AppSpinner)).to.have.length(1);
        })

    })

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                ledetekster: { henter: false, data: {} },
                ledere: {
                    data: [{
                        navn: "Ole",
                        erOppgitt: true,
                    }, {
                        navn: "Per",
                        erOppgitt: false,
                    }],
                    henter: false,
                    hentingFeilet: false
                },
                moter: {}
            }
            state.arbeidstaker = {
                data: {
                    navn: "Ole"
                }
            };
        })

        it("Skal returnere ledere som er oppgitt", () => {
            const props = mapStateToProps(state);
            expect(props.ledere).to.deep.equal([{navn: "Ole", erOppgitt: true}])
        })

        it("Skal returnere hentingFeilet når henting av ledere feiler", () => {
            state.ledere.data = []
            state.ledere.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentLedereFeiletBool).to.be.true;
        });

        it("Skal returnere hentingFeilet når henting av ledere ikke feiler", () => {
            state.ledere.data = []
            state.ledere.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentLedereFeiletBool).to.be.false;
        });

        it("Skal returnere henter når det hentes ledere", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = false;
            state.ledere.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere arbeidstaker", () => {
            const props = mapStateToProps(state);
            expect(props.arbeidstaker).to.deep.equal({
                navn: "Ole"
            });
        })

        it("Skal returnere henter når arbeidstaker hentes", () => {
            state.arbeidstaker.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal ikke returnere henter når arbeidstaker ikke hentes", () => {
            state.arbeidstaker.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere hentingFeilet når henting av arbeidstaker feiler", () => {
            state.arbeidstaker.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

    });

});