import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import MotebookingSkjema from '../../js/mote/skjema/MotebookingSkjema';
import MotebookingStatus from '../../js/mote/components/MotebookingStatus';
import { mapStateToProps, MotebookingSide } from '../../js/containers/MotebookingContainer';
import sinon from 'sinon';

describe("MotebookingContainer", () => {

    describe("MotebookingSide", () => {

        let hentMoter;
        let hentLedere;

        beforeEach(() => {
            hentMoter = sinon.spy();
            hentLedere = sinon.spy();
        });

        it("Skal vise AppSpinner", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} hentLedere={hentLedere} henter={true} />)
            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal hente møter ved init", () => {
            const mote = {};
            const component = shallow(<MotebookingSide fnr="123" hentMoter={hentMoter} hentLedere={hentLedere} mote={{}} />)
            expect(hentMoter.calledOnce).to.be.true;
            expect(hentMoter.calledWith("123")).to.be.true;
        });

        it("Skal hente ledere ved init", () => {
            const mote = {};
            const component = shallow(<MotebookingSide fnr="22" hentMoter={hentMoter} hentLedere={hentLedere} mote={{}} />)
            expect(hentLedere.calledOnce).to.be.true;
            expect(hentLedere.calledWith("22")).to.be.true;
        });

        it("Skal vise feilmelding hvis hentingFeilet", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} hentLedere={hentLedere} mote={{}} hentingFeilet />)
            expect(component.find(Feilmelding)).to.have.length(1)
        });

        it("Skal vise MotebookingStatus hvis det finnes møte", () => {
            const mote = {};
            const avbrytMote = sinon.spy();
            const component = shallow(<MotebookingSide hentMoter={hentMoter} hentLedere={hentLedere} mote={{}} avbrytMote={avbrytMote} />)
            expect(component.find(MotebookingStatus)).to.have.length(1);
        });

    })

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                navbruker: {
                    data: {
                        fnr: "887766",
                        harTilgang: true,
                    },
                },
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
                moter: {
                    data: []
                }
            }
        })

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state);
            expect(props.fnr).to.equal("887766");
        });


        it("Skal returnere opprettet møte", () => {
            state.moter.data = [{
                id: 1,
                status: "OPPRETTET"
            }]
            const props = mapStateToProps(state);
            expect(props.mote).to.deep.equal({
                id: 1,
                status: "OPPRETTET"
            });
        });

        it("Skal ikke returnere avbrutt mote", () => {
            state.moter.data = [{
                id: 1,
                status: 'AVBRUTT'
            }]
            const props = mapStateToProps(state);
            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere mote === undefined dersom det ikke finnes møter", () => {
            state.moter.data = []
            const props = mapStateToProps(state);
            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere henter når det hentes møter", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter når det ikke hentes møter", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
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

        it("Skal returnere sender", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sender = true;
            const props = mapStateToProps(state);
            expect(props.sender).to.be.true;
        });

        it("Skal returnere sender", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sender = false;
            const props = mapStateToProps(state);
            expect(props.sender).to.be.false;
        });

        it("Skal returnere hentingFeilet når henting av møter feiler", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet når henting av møter ikke feiler", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.false;
        });

        it("Skal returnere hentingFeilet når henting av ledere feiler", () => {
            state.ledere.data = []
            state.ledere.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet når henting av ledere ikke feiler", () => {
            state.ledere.data = []
            state.ledere.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.false;
        });

        it("Skal returnere sendingFeilet", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sendingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.sendingFeilet).to.be.true;
        });

        it("Skal returnere sendingFeilet", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sendingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.sendingFeilet).to.be.false;
        });

        it("Skal returnere ledere som er oppgitt", () => {
            const props = mapStateToProps(state);
            expect(props.ledere).to.deep.equal([{navn: "Ole", erOppgitt: true}])
        })


    });

});