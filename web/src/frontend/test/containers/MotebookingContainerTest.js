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

        beforeEach(() => {
            hentMoter = sinon.spy();
        })

        it("Skal vise AppSpinner", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} henter={true} />)
            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal hente møter ved init", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} mote={{}} />)
            expect(hentMoter.calledOnce).to.be.true;
        });

        it("Skal vise feilmelding hvis hentingFeilet", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} mote={{}} hentingFeilet />)
            expect(component.find(Feilmelding)).to.have.length(1)
        });

        it("Skal vise MotebookingStatus hvis det finnes møte", () => {
            const mote = {};
            const component = shallow(<MotebookingSide hentMoter={hentMoter} mote={{}} />)
            expect(component.contains(<MotebookingStatus mote={{}} />)).to.be.true;
        });


    })

    describe("mapStateToProps", () => {

        const state = {
            navbruker: {
                data: {
                    fnr: "887766",
                    harTilgang: true,
                },
            },
            moter: {
                data: []
            }
        }

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state);
            expect(props.fnr).to.equal("887766");
        });


        it("Skal returnere mote", () => {
            state.moter.data = [{
                id: 1
            }]
            const props = mapStateToProps(state);
            expect(props.mote).to.deep.equal({
                id: 1
            });
        });

        it("Skal returnere mote === undefined dersom det ikke finnes møter", () => {
            state.moter.data = []
            const props = mapStateToProps(state);
            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere henter", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
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

        it("Skal returnere hentingFeilet", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet", () => {
            state.moter.data = [{
                id: 1
            }]
            state.moter.hentingFeilet = false;
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


    });

});