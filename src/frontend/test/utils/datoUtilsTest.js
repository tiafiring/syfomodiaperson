import { expect } from 'chai';
import { restdatoTildato, restdatoTilLesbarDato } from '../../js/utils/datoUtils';

describe('datoUtils', () => {

    describe('restdatoTildato', () => {
        it('Skal konvertere dato fra rest til rett format', () => {
            const restDato = '2017-02-01';
            const dato = restdatoTildato(restDato);
            expect(dato).to.equal('01.02.2017');
        });
    });

    describe('restdatoTilLesbarDato', function () {
        it('Skal konvertere dato fra rest til rett format', () => {
            const restDato = '2017-02-01';
            const dato = restdatoTilLesbarDato(restDato);
            expect(dato).to.equal('1. februar 2017');
        });
    });
});
