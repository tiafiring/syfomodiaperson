import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Container, mapStateToProps } from '../../js/containers/SykepengesoknadContainer';
import sinon from 'sinon';
import soknader from '../../js/reducers/soknader';
import sykepengesoknader from '../../js/reducers/sykepengesoknader';
import ledetekster from '../../js/reducers/ledetekster';
import sykmeldinger from '../../js/reducers/sykmeldinger';
import { soknaderHentet } from '../../js/actions/soknader_actions';
import mockSykepengesoknader from '../mockdata/mockSykepengesoknader';
import mockSoknader from '../mockdata/mockSoknader';
import { sykepengesoknaderHentet } from '../../js/actions/sykepengesoknader_actions';
import SykepengesoknadArbeidstaker from '../../js/components/sykepengesoknad-arbeidstaker/SykepengesoknadArbeidstaker';
import Feilmelding from '../../js/components/Feilmelding';
import SykepengesoknadSelvstendig from '../../js/components/sykepengesoknad-selvstendig/SykepengesoknadSelvstendig';
import * as toggleSelectors from '../../js/selectors/toggleSelectors';
import SykepengesoknadUtland from '../../js/components/sykepengesoknad-utland/SykepengesoknadUtland';
import { sykmeldingerHentet } from '../../js/actions/sykmeldinger_actions';

describe('SykepengesoknadContainer', () => {
    let toggleStub;
    let state;
    let ownProps;
    let settOwnPropsId;
    const ARBEIDSTAKERSOKNAD_ID = 'b9732cc7-6101-446e-a1ef-ec25a425b4fb';
    const NAERINGSDRIVENDESOKNAD_ID = 'faadf7c1-3aac-4758-8673-e9cee1316a3c';
    const OPPHOLD_UTLAND_ID = 'e16ff778-8475-47e1-b5dc-d2ce4ad6b9ee';

    beforeEach(() => {
        state = {
            soknader: soknader(soknader(), soknaderHentet(mockSoknader)),
            sykepengesoknader: sykepengesoknader(sykepengesoknader(), sykepengesoknaderHentet(mockSykepengesoknader)),
            sykmeldinger: sykmeldinger(sykmeldinger(), sykmeldingerHentet([])),
            ledetekster: ledetekster(),
            tilgang: {
                data: {
                    harTilgang: true,
                },
            },
            navbruker: {
                data: {
                    navn: 'Ola Nordmann',
                },
            },
        };
        ownProps = {
            params: {
                sykepengesoknadId: '1',
            },
        };
        settOwnPropsId = (soknadId) => {
            ownProps.params.sykepengesoknadId = soknadId;
        };
        toggleStub = sinon.stub(toggleSelectors, 'erDev').returns(false);
    });

    afterEach(() => {
        toggleStub.restore();
    });

    describe('Visning av sykepengesøknad for arbeidstakere', () => {
        it('Skal vise SykepengesoknadArbeidstaker', () => {
            settOwnPropsId(ARBEIDSTAKERSOKNAD_ID);
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(SykepengesoknadArbeidstaker).length).to.equal(1);
        });

        it('Skal vise SykepengesoknadUtland', () => {
            settOwnPropsId(OPPHOLD_UTLAND_ID);
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(SykepengesoknadUtland).length).to.equal(1);
        });
    });

    describe('Håndtering av feil', () => {
        it('Skal vise feilmelding hvis søknaden er en arbeidstaker-søknad og henting av arbeidstaker-søknader feiler', () => {
            settOwnPropsId(ARBEIDSTAKERSOKNAD_ID);
            state.sykepengesoknader.hentingFeilet = true;
            state.sykepengesoknader.data = [];
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });

        it('Skal ikke vise feilmelding hvis søknaden er en arbeidstaker-søknad og henting av selvstendig-søknader feiler', () => {
            settOwnPropsId(ARBEIDSTAKERSOKNAD_ID);
            state.soknader.hentingFeilet = true;
            state.soknader.data = [];
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(SykepengesoknadArbeidstaker).length).to.equal(1);
            expect(component.find(Feilmelding).length).to.equal(0);
        });

        it('Skal vise feilmelding hvis søknaden er en selvstendig-søknad og henting av selvstendig-søknader feiler', () => {
            settOwnPropsId(NAERINGSDRIVENDESOKNAD_ID);
            state.soknader.hentingFeilet = true;
            state.soknader.data = [];
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });

        it('Skal ikke vise feilmelding hvis søknaden er en selvstendig-søknad og henting av arbeidstaker-søknader feiler', () => {
            settOwnPropsId(NAERINGSDRIVENDESOKNAD_ID);
            state.sykepengesoknader.hentingFeilet = true;
            state.sykepengesoknader.data = [];
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(SykepengesoknadSelvstendig).length).to.equal(1);
            expect(component.find(Feilmelding).length).to.equal(0);
        });

        it('Skal vise feilmelding hvis veileder ikke har tilgang', () => {
            settOwnPropsId(NAERINGSDRIVENDESOKNAD_ID);
            state.tilgang.data = {
                harTilgang: false,
            };
            const component = shallow(<Container {...mapStateToProps(state, ownProps)} />);
            expect(component.find(Feilmelding).length).to.equal(1);
        });
    });

});
