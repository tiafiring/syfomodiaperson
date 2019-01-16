import { expect } from 'chai';
import * as actions from '../../js/actions/motebehov_actions';
import {
    HENT_MOTEBEHOV_FORESPURT,
    HENTER_MOTEBEHOV,
    MOTEBEHOV_HENTET,
    HENT_MOTEBEHOV_FEILET,
} from '../../js/actions/actiontyper';

describe('moter_actions', () => {

    it('Skal ha en hentMoter()-funksjon som returnerer riktig action', () => {
        const action = actions.hentMotebehov('123');

        expect(action).to.deep.equal({
            type: HENT_MOTEBEHOV_FORESPURT,
            fnr: '123',
        });
    });

    it('Skal ha en henterMotebehov()-funksjon som returnerer riktig action', () => {
        const action = actions.henterMotebehov();

        expect(action).to.deep.equal({
            type: HENTER_MOTEBEHOV,
        });
    });

    it('Skal ha en motebehovHentet()-funksjon som returnerer riktig action', () => {
        const data = {
            id: 1,
            opprettetAv: '1234',
        };

        const action = actions.motebehovHentet(data);

        expect(action).to.deep.equal({
            type: MOTEBEHOV_HENTET,
            data: {
                id: 1,
                opprettetAv: '1234'
            },
        });
    });

    it('Skal ha en hentMotebehovFeilet()-funksjon som returnerer riktig action', () => {
        const action = actions.hentMotebehovFeilet();

        expect(action).to.deep.equal({
            type: HENT_MOTEBEHOV_FEILET,
        });
    });
});
