import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Motebehov from '../../js/components/Motebehov.js';
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

        it("Skal vise AppSpinner hvis noe blir hentet", () => {
            const motebehovet = {};

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                actions={actions}
                henter={true}

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

        it("Skal vise Motebehov hvis det finnes innsendte møtebehov", () => {
            const motebehovListeUtenFlereSvarFraSammePerson = [
                {
                    id: '123',
                    motebehovSvar: {},
                },
            ];

            const component = shallow(<MotebehovSide
                tilgang={tilgang}
                fnr={"fnr"}
                actions={actions}
                motebehovListeUtenFlereSvarFraSammePerson={motebehovListeUtenFlereSvarFraSammePerson}
                motebehovTilgang={motebehovTilgang}
                skalHenteMotebehov={false}
            />);

            expect(component.find(Motebehov)).to.have.length(1)
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

        it("Skal returnere henter når møtebehov og ledetekster ikke har blitt forsøkt hentet", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.hentet = false;
            state.motebehov.hentingFeilet = false;

            state.ledetekster.hentet = false;
            state.ledetekster.hentingFeilet= false;

            const props = mapStateToProps(state, ownProps);

            expect(props.henter).to.be.true;
        });

        it("Skal ikke returnere henter når møtebehov og ledetekster er forsøkt hentet", () => {
            state.motebehov.data = [{
                id: 1
            }];
            state.motebehov.hentet = true;
            state.ledetekster.hentet = true;

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

        it("Skal returnere ett element i listen med møtebehov hvis alle motebehovsvar er fra samme person", () => {
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

            expect(props.motebehovListeUtenFlereSvarFraSammePerson).to.have.length(1);
        });

        it("Skal returnere to elementer i listen med møtebehov hvis to motebehovSvar er fra ulike personer", () => {
            state.motebehov.data = [
                {
                    id: '1',
                    virksomhetsnummer: '123',
                    opprettetAv: 'sykmeldt',
                },
                {
                    id: '2',
                    virksomhetsnummer: '123',
                    opprettetAv: 'leder1',
                },
                {
                    id: '3',
                    virksomhetsnummer: '123',
                    opprettetAv: 'leder1',
                }
            ];

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehovListeUtenFlereSvarFraSammePerson).to.have.length(2);
        });

        it("Skal returnere det nyeste motebehovsvaret når det finnes flere svar", () => {
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
            const motebehovet = props.motebehovListeUtenFlereSvarFraSammePerson[0];

            expect(motebehovet.opprettetDato).to.equal(nyesteDato);
        });

        it('Skal returnere ledereUtenInnsendtMotebehov hvis sykmeldt har sendt inn svar men ikke leder i samme virksomhet', () => {
            const leder1 = 'Leder1';
            const leder2 = 'Leder2';
            const virksomhet1 = '123';
            const virksomhet2 = '999';
            const sykmeldt = 'Sykmeldt';
            state.motebehov.data = [
                {
                    id: '1',
                    virksomhetsnummer: virksomhet1,
                    opprettetAv: sykmeldt,
                    aktorId: sykmeldt,
                },
                {
                    id: '2',
                    virksomhetsnummer: virksomhet2,
                    opprettetAv: leder2,
                    aktorId: sykmeldt,
                },
                {
                    id: '3',
                    virksomhetsnummer: virksomhet2,
                    opprettetAv: sykmeldt,
                    aktorId: sykmeldt,
                },
            ];

            state.ledere.data = [
                {
                    aktoerId: leder1,
                    orgnummer: virksomhet1,
                },
                {
                    aktoerId: leder2,
                    orgnummer: virksomhet2,
                },
            ];

            const props = mapStateToProps(state, ownProps);
            const leder = props.ledereUtenInnsendtMotebehov[0];

            expect(leder).to.deep.equal({
                aktoerId: leder1,
                orgnummer: virksomhet1,
            });
        })

    });

});
