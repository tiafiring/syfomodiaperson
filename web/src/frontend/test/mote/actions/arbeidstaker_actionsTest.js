import { expect } from 'chai';
import * as actions from '../../../js/mote/actions/arbeidstaker_actions';

describe("arbeidstaker_actions", () => {

    it("Har en hentArbeidstaker()-funksjon som returnerer riktig action", () => {
        const action = actions.hentArbeidstaker("olsen");
        expect(action).to.deep.equal({
            type: 'HENT_ARBEIDSTAKER_FORESPURT',
            fnr: "olsen"
        });
    })

    it("Har en henterArbeidstaker()-funksjon som returnerer riktig action", () => {
        const action = actions.henterArbeidstaker();
        expect(action).to.deep.equal({
            type: 'HENTER_ARBEIDSTAKER',
        });
    });

    it("Har en hentArbeidstakerFeilet()-funksjon som returnerer riktig action", () => {
        const action = actions.hentArbeidstakerFeilet();
        expect(action).to.deep.equal({
            type: 'HENT_ARBEIDSTAKER_FEILET',
        });
    });

    it("Har en arbeidstakerHentet()-funksjon som returnerer riktig action", () => {
        const action = actions.arbeidstakerHentet({
            navn: "Andreas",
            kontaktinfo: {
                tlf: "123"
            }
        });
        expect(action).to.deep.equal({
            type: 'ARBEIDSTAKER_HENTET',
            data: {
                navn: "Andreas",
                kontaktinfo: {
                    tlf: "123"
                }
            }
        });
    });

});