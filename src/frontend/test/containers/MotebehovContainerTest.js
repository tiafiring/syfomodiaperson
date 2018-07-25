import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import MotebehovKvittering from '../../js/components/MotebehovKvittering.js';
import { mapStateToProps, MotebehovSide } from '../../js/containers/MotebehovContainer';
import sinon from 'sinon';

describe("MotebehovContainer", () => {

    describe("MotebehovSide", () => {

        let hentMotebehov;
        let ledetekster;
        let tilgang;
        let motebehovTilgang;
        beforeEach(() => {
            ledetekster = {};
            hentMotebehov = sinon.spy();
            tilgang = {
                harTilgang: true,
            };
            motebehovTilgang = {};
        });

        it("Skal vise AppSpinner", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                hentMotebehov={hentMotebehov}
                henter={true}
                motebehovTilgang={motebehovTilgang}
            />);

            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal hente møtebehov ved init", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                fnr="123"
                hentMotebehov={hentMotebehov}
                motebehovet={{}}
                motebehovTilgang={motebehovTilgang}
            />);

            expect(hentMotebehov.calledOnce).to.be.true;
            expect(hentMotebehov.calledWith("123")).to.be.true;
        });


        it("Skal vise feilmelding hvis hentingFeilet", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                hentMotebehov={hentMotebehov}
                motebehovet={{}}
                motebehovTilgang={motebehovTilgang}
                hentingFeilet
            />);

            expect(component.find(Feilmelding)).to.have.length(1)
        });

        it("Skal vise MotebehovKvittering hvis det finnes møtebehov som har motebehovSvar", () => {
            const motebehovet = {
                id: '123',
                motebehovSvar: {},
            };

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                fnr={"fnr"}
                hentMotebehov={hentMotebehov}
                motebehovet={motebehovet}
                motebehovTilgang={motebehovTilgang}
            />);

            expect(component.find(MotebehovKvittering)).to.have.length(1)
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
                motebehov: {
                    data: []
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

        it("Skal returnere motebehov === undefined dersom det ikke finnes møtebehov", () => {
            state.motebehov.data = [];

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehov).to.be.undefined;
        });

        it("Skal returnere henter når det hentes møtebehov", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.henter = true;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter når det ikke hentes møtebehov", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.henter = false;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.false;
        });

        it("Skal returnere hentingFeilet når henting av møtebehov feiler", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.hentingFeilet = true;

            const props = mapStateToProps(state, ownProps);

            expect(props.hentingFeilet).to.be.true;
        });

        it("Skal returnere hentingFeilet når henting av møtebehov ikke feiler", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.hentingFeilet = false;

            const props = mapStateToProps(state, ownProps);

            expect(props.hentingFeilet).to.be.false;
        });

    });

});
