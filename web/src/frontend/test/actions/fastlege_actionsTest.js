import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import * as actiontyper from '../../js/actions/actiontyper';
import * as actions  from '../../js/actions/fastleger_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('fastleger_actions', () => {
    it('Skal ha en henterFastleger()-funksjon som returnerer riktig action', () => {
        expect(actions.hentFastleger(1)).to.deep.equal({
            type: actiontyper.HENT_FASTLEGER_FORESPURT,
            fnr: 1,
        });
    });

    it('Skal ha en henterFastleger()-funksjon som returnerer riktig action', () => {
        expect(actions.henterFastleger()).to.deep.equal({
            type: actiontyper.HENTER_FASTLEGER,
        });
    });

    it('har en fastlegerHentet()-funksjon som returnerer riktig action', () => {
        expect(actions.fastlegerHentet(1)).to.deep.equal({
            type: actiontyper.FASTLEGER_HENTET,
            data: 1,
        });
    });

    it('Skal ha en hentFastlegerFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.hentFastlegerFeilet()).to.deep.equal({
            type: actiontyper.HENT_FASTLEGER_FEILET,
        });
    });
});
