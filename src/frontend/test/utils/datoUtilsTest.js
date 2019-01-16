import { expect } from 'chai';
import {
    restdatoTildato,
    restdatoTilLesbarDato,
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
});
