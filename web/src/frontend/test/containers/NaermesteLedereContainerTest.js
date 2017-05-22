import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import NaermesteLedere from '../../js/components/NaermesteLedere';
import { mapStateToProps, NaermesteLedereSide } from '../../js/containers/NaermesteLedereContainer';
import sinon from 'sinon';

describe("NaermesteLedereContainer", () => {

    describe("NaermesteLedereSide", () => {

        let hentLedere;
        let ledetekster;

        beforeEach(() => {
            hentLedere = sinon.spy();
            ledetekster = { };
        });
        
        it("Skal vise en Feilmelding hvis henting feiler", () => {
            const comp = shallow(<NaermesteLedereSide hentingFeilet />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });

        it("Skal vise en AppSpinner hvis den henter", () => {
            const comp = shallow(<NaermesteLedereSide henter />);
            expect(comp.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en Feilmelding hvis ikke tilgang", () => {
            const comp = shallow(<NaermesteLedereSide ikkeTilgang={true} ledetekster={ledetekster} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });


        it("Skal vise NaermesteLedere hvis den har hentet ledere", () => {
            const comp = shallow(<NaermesteLedereSide />);
            expect(comp.find(NaermesteLedere)).to.have.length(1);
        });
    });

    describe("mapStateToProps", () => {

        let state = {};

        beforeEach(() => {
            state.ledere = {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
            state.navbruker = {
                data: {
                    fnr: "123",
                    navn: "Ole"
                }
            };
            state.ledetekster = {
                data: {

                }
            }
        });

        it("Skal returnere ledere", () => {
            const props = mapStateToProps(state, {
                params: {
                    fnr: "123"
                }
            });
            expect(props.ledere).to.deep.equal([]);
        });

        it("Skal returnere henter", () => {
            const props = mapStateToProps(state, {
                params: {
                    fnr: "123"
                }
            });
            expect(props.henter).to.be.true;
            state.navbruker.henter = true;
            state.ledere.henter = false;
            const props2 = mapStateToProps(state, {
                params: {
                    fnr: "123"
                }
            });
            expect(props2.henter).to.be.true;
        });

        it("Skal returnere navbruker", () => {
            const props = mapStateToProps(state, {
                params: {
                    fnr: "123"
                }
            });
            expect(props.navbruker).to.deep.equal({
                fnr: "123",
                navn: "Ole"
            });
        });

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, {
                params: {
                    fnr: "8876574"
                }
            });
            expect(props.fnr).to.equal("8876574");
        });

    })

});