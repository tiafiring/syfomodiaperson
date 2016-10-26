import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/navbruker_actions.js';

describe('navbruker_actions', () => {

    it("Har en hentNavbruker()-funksjon", () => {
        const res = actions.hentNavbruker("44");
        expect(res).to.deep.equal({
            type: "HENT_NAVBRUKER_FORESPURT",
            fnr: "44"
        });
    });

    it("Har en sjekkTilgangMoteadmin()-funksjon", () => {
        const res = actions.sjekkTilgangMoteadmin();
        expect(res).to.deep.equal({
            type: 'SJEKK_TILGANG_MOTEADMIN_FORESPURT'
        });
    });

});