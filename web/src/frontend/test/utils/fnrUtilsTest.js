import { expect } from 'chai';
import { KJOENN } from '../../js/konstanter';
import {
    hentBrukersFoedseldatoFraFnr,
    hentBrukersAlderFraFnr,
    hentBrukersKjoennFraFnr,
} from '../../js/utils/fnrUtils';

describe('fnrUtils', () => {

    describe('hentBrukersFoedseldatoFraFnr', () => {
        const assertLik = (verdi, resultat) => {
            expect(hentBrukersFoedseldatoFraFnr(verdi).getTime()).to.equal(resultat.getTime());
        };
        const assertUndefined = (verdi) => {
            expect(hentBrukersFoedseldatoFraFnr(verdi)).to.equal(undefined);
        };

        it('Skal returnere undefined, med gyldig foedselsnummer, men ugyldig individsifre', () => {
            assertUndefined('14018089988');
        });

        it('Skal returnere rett foedselsdato, med gyldig D-nummer', () => {
            const foedselsdato =  new Date('1980-01-14');
            assertLik('54018010088', foedselsdato);
        });

        it('Skal returnere rett foedselsdato, med gyldig H-nummer', () => {
            const foedselsdato =  new Date('1980-01-14');
            assertLik('14418010088', foedselsdato);
        });

        describe('Personer foedt [1900-1999], med individsifre:[000, 499]', () => {
            const foedselsdato =  new Date('1980-01-14');
            it('Skal returnere rett foedselsdato, for individsifre 000', () => {
                assertLik('14018000088', foedselsdato);
            });

            it('Skal returnere rett foedselsdato, for individsifre 499', () => {
                assertLik('14018049988', foedselsdato);
            });
        });

        describe('Personer foedt [1855-1899], med individsifre:[500, 749]' , () => {
            const foedselsdato =  new Date('1880-01-14');
            it('Skal returnere rett foedselsdato, for individsifre 500', () => {
                assertLik('14018050088', foedselsdato);
            });

            it('Skal returnere rett foedselsdato, for individsifre 749', () => {
                assertLik('14018074988', foedselsdato);
            });
        });

        describe('Personer foedt [2000-2039], med individsifre:[500, 999]', () => {
            const foedselsdato =  new Date('2000-01-14');
            it('Skal returnere rett foedselsdato, for individsifre 500', () => {
                assertLik('14010050088', foedselsdato);
            });

            it('Skal returnere rett foedselsdato, for individsifre 749', () => {
                assertLik('14010074988', foedselsdato);
            });

            it('Skal returnere rett foedselsdato, for individsifre 999', () => {
                assertLik('14010099988', foedselsdato);
            });

            it('Skal returnere rett foedselsdato', () => {
                const foedselsdato =  new Date('2039-01-14');
                assertLik('14013999988', foedselsdato);
            });
        });

        describe('Personer foedt [1940-1999], med individsifre:[900, 999]', () => {
            const foedselsdato =  new Date('1940-01-14');
            it('Skal returnere rett foedselsdato, for individsifre 900', () => {
                assertLik('14014090088', foedselsdato);
            });

            it('Skal returnere rett foedselsdato, for individsifre 999', () => {
                assertLik('14014099988', foedselsdato);
            });
        });
    });

    describe('hentBrukersAlderFraFnr', () => {
        it('Skal returnere kvinne, om 3. individsiffer er partall', () => {
            expect(hentBrukersKjoennFraFnr('01019900200')).to.equal(KJOENN.KVINNE);
        });

        it('Skal returnere mann, om 3. individsiffer er oddetall', () => {
            expect(hentBrukersKjoennFraFnr('01019900100')).to.equal(KJOENN.MANN);
        });
    });
});
