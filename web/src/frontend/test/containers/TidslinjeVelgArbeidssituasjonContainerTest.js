import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import { Tidslinje } from 'digisyfo-npm';
import { mapStateToProps, VelgArbeidssituasjon } from '../../js/containers/TidslinjeVelgArbeidssituasjonContainer';
import sinon from 'sinon';

describe("TidslinjeVelgArbeidssituasjonContainer", () => {

    describe("mapStateToProps", () => {
        let state;
        let ownProps;

        beforeEach(() => {
            state = {};
            state.navbruker = {
                data: {
                    fnr: "123"
                }
            };
            state.ledetekster = {
                data: {}
            };

            ownProps = {
                valgtArbeidssituasjon: "olsen"
            }
        });

        it("Skal returnere valgtArbeidssituasjon", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.valgtArbeidssituasjon).to.equal("olsen");
        });

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("123");
        });

        it("Skal returnere arbeidssituasjoner", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.arbeidssituasjoner).to.have.length(2);
            expect(props.arbeidssituasjoner[0].verdi).to.equal("MED_ARBEIDSGIVER");
            expect(props.arbeidssituasjoner[1].verdi).to.equal("UTEN_ARBEIDSGIVER");
        });

    })

})