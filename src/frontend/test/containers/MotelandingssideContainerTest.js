import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import MotelandingssideContainer from '../../js/containers/MotelandingssideContainer';
import { mapStateToProps, MotelandingssideSide } from '../../js/containers/MotelandingssideContainer';
import sinon from 'sinon';

describe("MotelandingssideContainer", () => {

    describe("MotelandingssideSide", () => {

        let hentMoter;
        let hentMotebehov;
        let ledetekster;
        let tilgang;
        let moterTilgang;
        const harIkkeMoterTilgang = {
            harTilgang: false,
            begrunnelse: 'KODE7'
        };
        beforeEach(() => {
            ledetekster = {};
            hentMoter = sinon.spy();
            hentMotebehov = sinon.spy();
            tilgang = {
                harTilgang: true,
            };
            moterTilgang = {};
        });

        it("Skal vise AppSpinner", () => {
            const mote = {};
            const motebehovet = {};

            const component = shallow(<MotelandingssideSide
                tilgang={tilgang}
                hentMoter={hentMoter}
                hentMotebehov={hentMotebehov}
                henter={true}
                moterTilgang={moterTilgang}
            />);

            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal hente møter ved init", () => {
            const mote = {};
            const motebehovet = {};

            const component = shallow(<MotelandingssideSide
                tilgang={tilgang}
                fnr="123"
                hentMoter={hentMoter}
                hentMotebehov={hentMotebehov}
                mote={{}}
                motebehovet={{}}
                moterTilgang={moterTilgang}
            />);

            expect(hentMoter.calledOnce).to.be.true;
            expect(hentMoter.calledWith("123")).to.be.true;
        });

        it("Skal vise feilmelding hvis hentingFeilet", () => {
            const mote = {};
            const motebehovet = {};

            const component = shallow(<MotelandingssideSide
                tilgang={tilgang}
                hentMoter={hentMoter}
                hentMotebehov={hentMotebehov}
                mote={{}}
                motebehovet={{}}
                moterTilgang={moterTilgang}
                hentingFeilet
            />);

            expect(component.find(Feilmelding)).to.have.length(1)
        });
    });

    describe("mapStateToProps", () => {

        let state;
        let ownProps;
        beforeEach(() => {
            state = {
                navbruker: {
                    data: {
                        fnr: "887766",
                    },
                },
                moter: {
                    data: []
                },
                motebehov: {
                    data: []
                },
                virksomhet: {
                    navn: "BEKK"
                },
                tilgang: {
                    data: {
                        harTilgang: true,
                    },
                    hentingFeilet: false,
                    henter: false,
                },
                ledetekster: {
                    hentingFeilet: false,
                    henter: false,
                    data: {}
                }
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
            }];

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
            }];

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
            }];

            const props = mapStateToProps(state, ownProps);

            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere mote === undefined dersom det ikke finnes møter", () => {
            state.moter.data = [];

            const props = mapStateToProps(state, ownProps);

            expect(props.mote).to.be.undefined;
        });

        it("Skal returnere motebehov === undefined dersom det ikke finnes motebehov", () => {
            state.motebehov.data = [];

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehovet).to.be.undefined;
        });

        it("Skal returnere henter når det hentes møter", () => {
            state.moter.data = [{
                id: 1
            }];
            state.moter.henter = true;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter når det ikke hentes møter", () => {
            state.moter.data = [{
                id: 1
            }];
            state.moter.henter = false;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.false;
        });

        it("Skal returnere henter når det hentes motebehov", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.henter = true;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter når det ikke hentes motebehov", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.henter = false;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.false;
        });
    });
});