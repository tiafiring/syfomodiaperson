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

        let actions;
        let hentMotebehov;
        let ledetekster;
        let tilgang;
        let motebehovTilgang;
        let motebehovForsokthentet;
        let ledere;
        beforeEach(() => {
            ledetekster = {};
            hentMotebehov = sinon.spy();
            tilgang = {
                harTilgang: true,
            };
            motebehovTilgang = {};
            actions = {
                hentMotebehov,
            };
        });

        it("Skal vise AppSpinner hvis man henter møtebehov/ledetekster", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                actions={actions}
                henter={true}
                motebehovForsoktHentet={true}

                motebehovTilgang={motebehovTilgang}
            />);

            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal vise AppSpinner hvis møtebehov ikke er forsøkt hentet", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                actions={actions}
                motebehovForsoktHentet={false}

                motebehovTilgang={motebehovTilgang}
            />);

            expect(component.find(AppSpinner)).to.have.length(1)
        });

        it("Skal vise feilmelding hvis hentingFeilet", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                actions={actions}
                motebehovListe={[]}
                motebehovTilgang={motebehovTilgang}
                motebehovForsoktHentet={true}
                hentingFeilet
            />);

            expect(component.find(Feilmelding)).to.have.length(1)
        });

        it("Skal vise MotebehovKvittering hvis det finnes møtebehov som har motebehovSvar", () => {
            const motebehovListe = [
                {
                    id: '123',
                    motebehovSvar: {},
                },
            ];

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                fnr={"fnr"}
                actions={actions}
                motebehovListe={motebehovListe}
                motebehovTilgang={motebehovTilgang}
                motebehovForsoktHentet={true}
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
                },
                veilederoppgaver: {
                    data: [],
                },
                veilederinfo: {
                    data: {},
                },
                ledere: {
                    data: [],
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

        it("Skal returnere ett element i motebehovListe hvis alle motebehovsvar er fra samme virksomhet", () => {
            state.motebehov.data = [
                {
                    id: '1',
                    virksomhetsnummer: '123',
                },
                {
                    id: '2',
                    virksomhetsnummer: '123',
                },
            ];

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehovListe).to.have.length(1);
        });

        it("Skal returnere to elementer i motebehovListe hvis to motebehovSvar er fra ulike virksomheter", () => {
            state.motebehov.data = [
                {
                    id: '1',
                    virksomhetsnummer: '123',
                },
                {
                    id: '2',
                    virksomhetsnummer: '123',
                },
                {
                    id: '3',
                    virksomhetsnummer: '999',
                }
            ];

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehovListe).to.have.length(2);
        });

        it("Skal returnere det nyeste motebehovsvaret når det finnes flere fra samme virksomhet", () => {
            const eldsteDato = new Date("2018-05-05");
            const nyesteDato = new Date("2018-10-10");
            state.motebehov.data = [
                {
                    id: '1',
                    virksomhetsnummer: '123',
                    opprettetDato: eldsteDato,
                },
                {
                    id: '2',
                    virksomhetsnummer: '123',
                    opprettetDato: nyesteDato,
                },
            ];

            const props = mapStateToProps(state, ownProps);
            const motebehovet = props.motebehovListe[0];

            expect(motebehovet.opprettetDato).to.equal(nyesteDato);
        });

    });

});
