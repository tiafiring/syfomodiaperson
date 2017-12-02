import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import MotebookingSkjema from '../../js/mote/skjema/MotebookingSkjema';
import MotestatusContainer from '../../js/containers/MotestatusContainer';
import { mapStateToProps, MotebookingSide } from '../../js/containers/MotebookingContainer';
import sinon from 'sinon';

describe("MotebookingContainer", () => {

    describe("MotebookingSide", () => {

        let hentMoter;
        let ledetekster;
        beforeEach(() => {
            ledetekster = {};
            hentMoter = sinon.spy();
        });

        it("Skal vise AppSpinner", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} henter={true} />)
            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal hente møter ved init", () => {
            const mote = {};
            const component = shallow(<MotebookingSide fnr="123" hentMoter={hentMoter} mote={{}} />)
            expect(hentMoter.calledOnce).to.be.true;
            expect(hentMoter.calledWith("123")).to.be.true;
        });


        it("Skal vise feilmelding hvis hentMoterFeiletBool", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} mote={{}} hentMoterFeiletBool />)
            expect(component.find(Feilmelding)).to.have.length(1)
        });

        it("Skal vise MotestatusContainer hvis det finnes møte", () => {
            const mote = {
                moteUuid: "8877"
            };
            const avbrytMote = sinon.spy();
            const component = shallow(<MotebookingSide hentMoter={hentMoter} mote={mote} />)
            expect(component.contains(<MotestatusContainer moteUuid={"8877"} />)).to.be.true;
        });

    })

    describe("mapStateToProps", () => {

        let state;
        let ownProps;
        beforeEach(() => {
            state = {
                ledetekster: {},
                navbruker: {
                    data: {
                        fnr: "887766",
                        harTilgang: true,
                    },
                },
                moter: {
                    data: []
                },
                virksomhet: {
                    navn: "BEKK"
                },
                ledere: {
                    ikkeTilgang: false,
                },
            };
            ownProps = {
                params: {
                    fnr: "887766",
                }
            }
        });

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("887766");
        });
        
        it("Skal returnere opprettet møte", () => {
            state.moter.data = [{
                id: 1,
                status: "OPPRETTET"
            }]
            const props = mapStateToProps(state, ownProps);
            expect(props.mote).to.deep.equal({
                id: 1,
                status: "OPPRETTET"
            });
        });

        it("Skal returnere BEKREFTET møte", () => {
            state.moter.data = [{
                id: 1,
                status: "BEKREFTET"
            }]
            const props = mapStateToProps(state, ownProps);
            expect(props.mote).to.deep.equal({
                id: 1,
                status: "BEKREFTET"
            });
        });

        it("Skal ikke returnere avbrutt mote", () => {
            state.moter.data = [{
                id: 1,
                status: 'AVBRUTT'
            }]
            const props = mapStateToProps(state, ownProps);
            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere mote === undefined dersom det ikke finnes møter", () => {
            state.moter.data = []
            const props = mapStateToProps(state, ownProps);
            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere henter når det hentes møter", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter når det ikke hentes møter", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = false;
            state.moter.henter = false;
            state.ledere.henter = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere sender", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sender = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.sender).to.be.true;
        });

        it("Skal returnere sender", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sender = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.sender).to.be.false;
        });

        it("Skal returnere hentingFeilet når henting av møter feiler", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.hentMoterFeiletBool).to.be.true;
        });

        it("Skal returnere hentingFeilet når henting av møter ikke feiler", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.hentingFeilet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.hentMoterFeiletBool).to.be.false;
        });

        it("Skal returnere sendingFeilet", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sendingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.sendingFeilet).to.be.true;
        });

        it("Skal returnere sendingFeilet", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.sendingFeilet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.sendingFeilet).to.be.false;
        });

    });

});