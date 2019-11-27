import { expect } from 'chai';
import {
    periodeOverlapperMedPeriode,
    senesteTom,
    tidligsteFom,
    tilfellerFromTilfelleperioder,
} from '../../src/utils/periodeUtils';

describe('periodeUtils', () => {
    describe('tidligsteFom', () => {
        it('skal returnere den tidligste startdatoen fra en liste med perioder', () => {
            const fom1 = '2019-01-01';
            const fom2 = '2019-02-02';
            const fom3 = '2019-03-03';
            const tom = '2019-05-05';

            const perioder = [
                {
                    fom: fom2,
                    tom: tom,
                },
                {
                    fom: fom3,
                    tom: tom,
                },
                {
                    fom: fom1,
                    tom: tom,
                },
            ];

            const tidligsteStartdato = tidligsteFom(perioder);

            expect(tidligsteStartdato).to.equal(fom1);
        });
    });
    describe('senesteTom', () => {
        it('skal returnere den seneste sluttdatoen fra en liste med perioder', () => {
            const fom = '2019-05-05';
            const tom1 = '2019-01-01';
            const tom2 = '2019-02-02';
            const tom3 = '2019-03-03';

            const perioder = [
                {
                    fom: fom,
                    tom: tom2,
                },
                {
                    fom: fom,
                    tom: tom3,
                },
                {
                    fom: fom,
                    tom: tom1,
                },
            ];

            const senesteSluttdato = senesteTom(perioder);

            expect(senesteSluttdato).to.equal(tom3);
        });
    });
    describe('periodeOverlapperMedPeriode', () => {
        it('Skal gi true hvis to perioder overlapper', () => {
            const periodeA = {
                fom: '2019-01-01',
                tom: '2019-03-03',
            };
            const periodeB = {
                fom: '2019-02-02',
                tom: '2019-04-04',
            };

            const periodeneOverlapper = periodeOverlapperMedPeriode(periodeA, periodeB);

            expect(periodeneOverlapper).to.equal(true);
        });
        it('Skal gi false hvis to perioder ikke overlapper', () => {
            const periodeA = {
                fom: '2019-03-03',
                tom: '2019-04-04',
            };
            const periodeB = {
                fom: '2019-01-01',
                tom: '2019-02-02',
            };

            const periodeneOverlapper = periodeOverlapperMedPeriode(periodeA, periodeB);

            expect(periodeneOverlapper).to.equal(false);
        });
    });

    describe('tilfellerFromTilfelleperioder', () => {
        it('Skal gi en tom liste hvis oppfolgingstilfelleperioder er tom', () => {
            const oppfolgingstilfelleperioder = {};

            const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);

            expect(tilfeller.length).to.equal(0);
        });
        it('Skal gi en tom liste hvis ingen bedrifter har hentet data', () => {
            const oppfolgingstilfelleperioder = {
                '555666444': {
                    data: [],
                },
            };

            const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);

            expect(tilfeller.length).to.equal(0);
        });
        it('Skal gi riktig tilfelle hvis det bare er én periode', () => {
            const oppfolgingstilfelleperioder = {
                '555666444': {
                    data: [
                        {
                            orgnummer: '555666444',
                            fom: '2019-06-05',
                            tom: '2019-12-11',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                    ]
                },
            };

            const expectedTilfelle = [
                {
                    fom: '2019-06-05',
                    tom: '2019-12-11',
                },
            ];

            const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);

            expect(tilfeller).to.deep.equal(expectedTilfelle);
        });
        it('Skal gi riktig tilfelle selv om periodene ikke ligger i riktig rekkefølge', () => {
            const oppfolgingstilfelleperioder = {
                '555666444': {
                    data: [
                        {
                            orgnummer: '555666444',
                            fom: '2019-06-05',
                            tom: '2019-12-11',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                        {
                            orgnummer: '555666444',
                            fom: '2019-01-05',
                            tom: '2019-10-11',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                        {
                            orgnummer: '555666444',
                            fom: '2019-07-05',
                            tom: '2019-12-24',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                    ],
                },
            };

            const expectedTilfelle = [
                {
                    fom: '2019-01-05',
                    tom: '2019-12-24',
                },
            ];

            const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);

            expect(tilfeller).to.deep.equal(expectedTilfelle);
        });
        it('Skal gi en liste med to objekter hvis det er to bedrifter med tilfelleperioder', () => {
            const oppfolgingstilfelleperioder = {
                '110110110': {
                    data: [
                        {
                            orgnummer: '110110110',
                            fom: '2019-06-07',
                            tom: '2019-07-10',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                        {
                            orgnummer: '110110110',
                            fom: '2019-07-11',
                            tom: '2019-08-26',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                    ],
                },
                '555666444': {
                    data: [
                        {
                            orgnummer: '555666444',
                            fom: '2019-06-05',
                            tom: '2019-12-11',
                            grad: 100,
                            aktivitet: 'Heihei'
                        },
                    ]
                },
            };

            const expectedTilfeller = [
                {
                    fom: '2019-06-07',
                    tom: '2019-08-26',
                },
                {
                    fom: '2019-06-05',
                    tom: '2019-12-11',
                },
            ];

            const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);

            expect(tilfeller).to.deep.equal(expectedTilfeller);
        });
    })
});
