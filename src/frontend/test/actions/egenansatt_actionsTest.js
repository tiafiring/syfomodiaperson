import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import * as actiontyper from '../../js/actions/actiontyper';
import * as actions  from '../../js/actions/egenansatt_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('egenansatt_actions', () => {
    it('Skal ha en hentEgenansatt()-funksjon som returnerer riktig action', () => {
        expect(actions.hentEgenansatt(1)).to.deep.equal({
            type: actiontyper.HENT_EGENANSATT_FORESPURT,
            fnr: 1,
        });
    });

    it('Skal ha en henterEgenansatt()-funksjon som returnerer riktig action', () => {
        expect(actions.henterEgenansatt()).to.deep.equal({
            type: actiontyper.HENTER_EGENANSATT,
        });
    });

    it('har en egenansattHentet()-funksjon som returnerer riktig action', () => {
        expect(actions.egenansattHentet(1)).to.deep.equal({
            type: actiontyper.EGENANSATT_HENTET,
            data: 1,
        });
    });

    it('Skal ha en hentFastlegerFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.hentEgenansattFeilet()).to.deep.equal({
            type: actiontyper.HENT_EGENANSATT_FEILET,
        });
    });
});
