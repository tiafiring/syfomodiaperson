import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import {
    HENT_DISKRESJONSKODE_FORESPURT,
    HENTER_DISKRESJONSKODE,
    DISKRESJONSKODE_HENTET,
    HENT_DISKRESJONSKODE_FEILET,
} from '../../js/actions/actiontyper';
import * as actions  from '../../js/actions/diskresjonskode_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('diskresjonskode_actions', () => {
    it('Skal ha en hentDiskresjonskode()-funksjon som returnerer riktig action', () => {
        expect(actions.hentDiskresjonskode(1)).to.deep.equal({
            type: HENT_DISKRESJONSKODE_FORESPURT,
            fnr: 1,
        });
    });

    it('Skal ha en henterDiskresjonskode()-funksjon som returnerer riktig action', () => {
        expect(actions.henterDiskresjonskode()).to.deep.equal({
            type: HENTER_DISKRESJONSKODE,
        });
    });

    it('har en diskresjonskodeHentet()-funksjon som returnerer riktig action', () => {
        expect(actions.diskresjonskodeHentet(1)).to.deep.equal({
            type: DISKRESJONSKODE_HENTET,
            data: 1,
        });
    });

    it('Skal ha en hentDiskresjonskodeFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.hentDiskresjonskodeFeilet()).to.deep.equal({
            type: HENT_DISKRESJONSKODE_FEILET,
        });
    });
});
