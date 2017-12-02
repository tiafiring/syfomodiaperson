import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import { Tidslinje } from 'digisyfo-npm';
import { mapStateToProps, TidslinjeSide, getArbeidssituasjon } from '../../js/containers/TidslinjeContainer';
import TidslinjeVelgArbeidssituasjonContainer from '../../js/containers/TidslinjeVelgArbeidssituasjonContainer';
import sinon from 'sinon';

describe("TidslinjeContainer", () => {

    let state = {};
    let ownProps = {};

    beforeEach(() => {
        state.tidslinjer = {
            data: [{
                hendelser: [{foo: 1}, {foo: 2}]
            }],
            hentingFeilet: false,
            henter: false,
            ikkeTilgang: false,
        };
        state.ledetekster = {
            data: {"min": "tekst"},
            hentingFeilet: false,
            henter: false,
        };
        state.ledere = {
            ikkeTilgang: false,
            hentingFeilet: false,
            henter: false,
        };
        state.navbruker = {
            data: {
                fnr: "887766",
                navn: "Helge"
            }
        };
        ownProps.params = {
            valgtArbeidssituasjon: "",
            fnr: "887766"
        }
    });

    describe("mapStateToProps", () => {

        it("Skal returnere fnr === fnr hvis fnr finnes", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("887766");
        });

        it("Skal returnere NAV-brukerens navn", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.brukernavn).to.equal("Helge")
        })

        it("Skal returnere hendelser", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.hendelser).to.deep.equal([{foo: 1}, {foo: 2}]);
        });

        it("Skal returnere valgtArbeidssituasjon", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.valgtArbeidssituasjon).to.equal("MED_ARBEIDSGIVER");
        });

        it("Skal returnere valgtArbeidssituasjon når det er definert", () => {
            ownProps.params.valgtArbeidssituasjon = "uten-arbeidsgiver";
            const props = mapStateToProps(state, ownProps);
            expect(props.valgtArbeidssituasjon).to.equal("UTEN_ARBEIDSGIVER");
        });

        it("Skal returnere valgtArbeidssituasjon = MED_ARBEIDSGIVER når det er definert som now weird", () => {
            ownProps.params.valgtArbeidssituasjon = "noe-weird";
            const props = mapStateToProps(state, ownProps);
            expect(props.valgtArbeidssituasjon).to.equal("MED_ARBEIDSGIVER");
        });

        it("Skal returnere hendelser fra hash", () => {
            ownProps.location = {
                hash: "#1/3"
            };
            const props = mapStateToProps(state, ownProps);
            expect(props.apneHendelseIder).to.deep.equal(["1", "3"])
            ownProps.location = {
                hash: "#8/banan"
            };
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.apneHendelseIder).to.deep.equal(["8", "banan"])
        });

        it("Skal returnere hentingFeilet", () => {
            const props0 = mapStateToProps(state, ownProps);
            expect(props0.hentingFeilet).to.be.false;

            state.ledetekster.hentingFeilet = true;
            const props1 = mapStateToProps(state, ownProps);
            expect(props1.hentingFeilet).to.be.true;
            
            state.ledetekster.hentingFeilet = false;
            state.tidslinjer.hentingFeilet = true;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.hentingFeilet).to.be.true;
        });

        it("Skal returnere henter", () => {
            const props0 = mapStateToProps(state, ownProps);
            expect(props0.henter).to.be.false;

            state.ledetekster.henter = true;
            const props1 = mapStateToProps(state, ownProps);
            expect(props1.henter).to.be.true;
            
            state.ledetekster.henter = false;
            state.tidslinjer.henter = true;
            const props2 = mapStateToProps(state, ownProps);
            expect(props2.henter).to.be.true;
        });

        it("Skal returnere ledetekster", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.ledetekster).to.deep.equal({min: "tekst"})
        });

    });

    describe("getArbeidssituasjon", () => {
        it("Skal returnere arbeidssituasjon når arbeidssituasjon = med-arbeidsgiver", () => {
            const a = getArbeidssituasjon("med-arbeidsgiver");
            expect(a).to.equal("MED_ARBEIDSGIVER");
        });

        it("Skal returnere arbeidssituasjon når arbeidssituasjon = uten-arbeidsgiver", () => {
            const a = getArbeidssituasjon("uten-arbeidsgiver");
            expect(a).to.equal("UTEN_ARBEIDSGIVER");
        });

        it("Skal returnere arbeidssituasjon når arbeidssituasjon = undefined", () => {
            const a = getArbeidssituasjon(undefined);
            expect(a).to.equal("MED_ARBEIDSGIVER");
        });
    });

    describe("TidslinjeSide", () => {

        let hentTidslinjer;
        let actions;
        let ledetekster;

        beforeEach(() => {
            ledetekster = { henter: false, data: {} },
            hentTidslinjer = sinon.spy();
            actions = {
                hentTidslinjer,
            }
        })

        it("Skal vise AppSpinner dersom henter = true", () => {
            const comp = shallow(<TidslinjeSide henter actions={actions} />);
            expect(comp.contains(<AppSpinner />)).to.be.true;
        });

        it("Skal vise Feilmelding dersom hentingFeilet = true", () => {
            const comp = shallow(<TidslinjeSide hentingFeilet actions={actions} />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        it("Skal vise Feilmelding dersom ikkeTilgang = true", () => {
            const comp = shallow(<TidslinjeSide ikkeTilgang={true} actions={actions} ledetekster={ledetekster} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });

        it("Skal vise TidslinjeVelgArbeidssituasjonContainer og Tidslinje dersom hentingFeilet = true", () => {
            const comp = shallow(<TidslinjeSide valgtArbeidssituasjon="MED_ARBEIDSGIVER" actions={actions} />);
            expect(comp.find(TidslinjeVelgArbeidssituasjonContainer)).to.have.length(1);
            expect(comp.find(Tidslinje)).to.have.length(1);
            expect(comp.find(Tidslinje).prop("arbeidssituasjon")).to.equal("MED_ARBEIDSGIVER");
        });

        it("Skal kalle på hentTidslinjer med fnr, apneHendelseIder og arbeidssituasjon", () => {
            const comp = shallow(<TidslinjeSide actions={actions} fnr="12" apneHendelseIder={[1,2]} arbeidssituasjon="banan" />);
            expect(hentTidslinjer.calledOnce).to.be.true;
            expect(hentTidslinjer.calledWith("12", [1,2], "banan")).to.be.true;
        });

        it

    });

});
