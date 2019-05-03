import { expect } from 'chai';
import {
    dagerMellomDatoer,
    restdatoTildato,
    restdatoTilLesbarDato,
    tilDatoMedUkedagOgManedNavn,
    tilLesbarDatoMedArUtenManedNavn,
    tilLesbarPeriodeMedArUtenManednavn,
    visKlokkeslett,
} from '../../js/utils/datoUtils';

describe('datoUtils', () => {
    describe('visKlokkeslett', () => {
        it('Skal vise klokkeslett på riktig format', () => {
            const d = visKlokkeslett(new Date(2017, 4, 3, 9, 0));
            expect(d).to.equal('09.00');
        });
    });

    describe('restdatoTildato', () => {
        it('Skal konvertere dato fra rest til rett format', () => {
            const restDato = '2017-02-01';
            const dato = restdatoTildato(restDato);
            expect(dato).to.equal('01.02.2017');
        });
    });

    describe('restdatoTilLesbarDato', () => {
        it('Skal konvertere dato fra rest til rett format', () => {
            const restDato = '2017-02-01';
            const dato = restdatoTilLesbarDato(restDato);
            expect(dato).to.equal('1. februar 2017');
        });
    });
    describe('tilDatoMedUkedagOgManedNavn', () => {
        it('Skal gi en string med dato, ukedag, månednavn, og år', () => {
            const restDato = '2019-03-11';
            const dato = tilDatoMedUkedagOgManedNavn(restDato);
            expect(dato).to.equal('Mandag 11. mars 2019');
        });
    });
    describe('tilLesbarDatoMedArUtenManedNavn', () => {
        it('Skal gi en string med dato, måned og år, skilt av punktum, uten dag- eller månednavn', () => {
            const restDato = '2019-03-11';
            const dato = tilLesbarDatoMedArUtenManedNavn(restDato);
            expect(dato).to.equal('11.03.2019');
        });
    });
    describe('tilLesbarPeriodeMedArUtenManednavn', () => {
        it('Skal gi en string med periode der begge datoer har dato, måned og år, skilt av punktum, uten dag- eller månednavn', () => {
            const restDatoFom = '2019-03-11';
            const restDatoTom = '2019-10-02';
            const periode = tilLesbarPeriodeMedArUtenManednavn(restDatoFom, restDatoTom);
            expect(periode).to.equal('11.03.2019 - 02.10.2019');
        });
    });
    describe('dagerMellomDatoer', () => {
        it('Skal gi antall dager mellom to datoer', () => {
            const restDatoFom = new Date('2019-03-11');
            const restDatoTom = new Date('2019-03-15');
            const antallDager = dagerMellomDatoer(restDatoFom, restDatoTom);
            expect(antallDager).to.equal(4);
        });
    });
});
