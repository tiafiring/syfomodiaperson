import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import {
    Tidslinje,
} from 'digisyfo-npm';
import Feilmelding from '../../js/components/Feilmelding';
import AppSpinner from '../../js/components/AppSpinner';
import {
    mapStateToProps,
    TidslinjeSide,
} from '../../js/containers/TidslinjeContainer';
import TidslinjeVelgArbeidssituasjonContainer from '../../js/containers/TidslinjeVelgArbeidssituasjonContainer';

describe('TidslinjeContainer', () => {
    let state = {};
    let ownProps = {};

    beforeEach(() => {
        state.tidslinjer = {
            data: [{
                hendelser: [{foo: 1}, {foo: 2}]
            }],
            hentingFeilet: false,
            henter: false,
        };
        state.ledetekster = {
            data: {'min': 'tekst'},
            hentingFeilet: false,
            henter: false,
        };
        state.ledere = {
            hentingFeilet: false,
            henter: false,
        };
        state.navbruker = {
            data: {
                fnr: '887766',
                navn: 'Hulgis',
            }
        };
        state.sykeforloep = {
            henter: false,
            hentet: false,
            hentingFeilet: false,
            data: [],
        };
        state.tilgang = {
            data: {
                harTilgang: true,
            }
        };
        ownProps.params = {
            valgtArbeidssituasjon: '',
            fnr: '887766',
        }
    });

    describe('mapStateToProps', () => {
        it('Skal returnere fnr === fnr hvis fnr finnes', () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal('887766');
        });

        it('Skal returnere NAV-brukerens navn', () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.brukernavn).to.equal('Hulgis')
        });

        it('Skal returnere hendelser', () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.hendelser).to.deep.equal([{foo: 1}, {foo: 2}]);
        });

        it('Skal returnere hendelser fra hash', () => {
            ownProps.location = {
                hash: '#1/3',
            };
            const props = mapStateToProps(state, ownProps);
            expect(props.apneHendelseIder).to.deep.equal(['1', '3']);
            ownProps.location = {
                hash: '#8/banan',
            };
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.apneHendelseIder).to.deep.equal(['8', 'banan'])
        });

        it('Skal returnere hentingFeilet', () => {
            const props0 = mapStateToProps(state, ownProps);
            expect(props0.hentingFeilet).to.be.equal(false);

            state.ledetekster.hentingFeilet = true;
            const props1 = mapStateToProps(state, ownProps);
            expect(props1.hentingFeilet).to.be.equal(true);

            state.ledetekster.hentingFeilet = false;
            state.sykeforloep.hentingFeilet = true;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.hentingFeilet).to.be.equal(true);
        });

        it('Skal returnere henter', () => {
            const props0 = mapStateToProps(state, ownProps);
            expect(props0.henter).to.be.equal(false);

            state.ledetekster.henter = true;
            const props1 = mapStateToProps(state, ownProps);
            expect(props1.henter).to.be.equal(true);

            state.ledetekster.henter = false;
            state.sykeforloep.henter = true;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.henter).to.be.equal(true);
        });

        it('Skal returnere ledetekster', () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.ledetekster).to.deep.equal({min: 'tekst'});
        });
    });

    describe('TidslinjeSide', () => {
        let sykeforloep;
        let hentTidslinjer;
        let hentSykeforloep;
        let actions;
        let ledetekster;
        let tilgang;
        let komponent;

        beforeEach(() => {
            sykeforloep = {
                henter: false,
                hentet: false,
                data: [],
            };
            tilgang = {
                harTilgang: true,
            };
            ledetekster = { henter: false, data: {} };
            hentTidslinjer = sinon.spy();
            hentSykeforloep = sinon.spy();
            actions = {
                hentTidslinjer,
                hentSykeforloep,
            }
        });

        it('Skal vise AppSpinner dersom henter = true', () => {
            komponent = shallow(<TidslinjeSide
                tilgang={tilgang}
                henter
                actions={actions}
                sykeforloep={sykeforloep}
            />);
            expect(komponent.contains(<AppSpinner />)).to.be.equal(true);
        });

        it('Skal vise Feilmelding dersom hentingFeilet = true', () => {
            komponent = shallow(<TidslinjeSide
                tilgang={tilgang}
                hentingFeilet
                actions={actions}
                sykeforloep={sykeforloep}
            />);
            expect(komponent.contains(<Feilmelding />)).to.be.equal(true);
        });

        it('Skal vise Feilmelding dersom ikke tilgang = true', () => {
            tilgang = {
                harTilgang: false,
            };
            komponent = shallow(<TidslinjeSide
                tilgang={tilgang}
                actions={actions}
                ledetekster={ledetekster}
                sykeforloep={sykeforloep}
            />);
            expect(komponent.find(Feilmelding)).to.have.length(1);
        });

        it('Skal vise TidslinjeVelgArbeidssituasjonContainer og Tidslinje dersom hentingFeilet = false', () => {
            komponent = shallow(<TidslinjeSide
                tilgang={tilgang}
                hentingFeilet={false}
                arbeidssituasjon="MED_ARBEIDSGIVER"
                actions={actions}
                sykeforloep={sykeforloep}
            />);
            expect(komponent.find(TidslinjeVelgArbeidssituasjonContainer)).to.have.length(1);
            expect(komponent.find(Tidslinje)).to.have.length(1);
            expect(komponent.find(Tidslinje).prop('arbeidssituasjon')).to.equal('MED_ARBEIDSGIVER');
        });

        it('Skal hente sykeforloep, om sykeforloep ikke er hentet', () => {
            komponent = shallow(<TidslinjeSide
                tilgang={tilgang}
                actions={actions}
                fnr='12'
                sykeforloep={sykeforloep}
            />);
            expect(hentSykeforloep.called).to.be.equal(true);
        });

        it('Skal ikke hente sykeforloep, om sykeforloep er hentet', () => {
            komponent = shallow(<TidslinjeSide
                tilgang={tilgang}
                actions={actions}
                fnr='12'
                sykeforloep={Object.assign({}, sykeforloep, {
                    hentet: true,
                })}
            />);
            expect(hentSykeforloep.called).to.be.equal(false);
        });
    });
});
