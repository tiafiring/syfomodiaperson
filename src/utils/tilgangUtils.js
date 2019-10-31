export const hentBegrunnelseTekst = (begrunnelse) => {
    if (begrunnelse === 'GEOGRAFISK') {
        return 'sykefravaer.veileder.feilmelding.GEOGRAFISK.melding';
    } else if (begrunnelse === 'SYFO') {
        return 'sykefravaer.veileder.feilmelding.SENSITIV.melding';
    } else if (begrunnelse === 'KODE6') {
        return 'sykefravaer.veileder.feilmelding.KODE6.melding';
    } else if (begrunnelse === 'KODE7') {
        return 'sykefravaer.veileder.feilmelding.KODE7.melding';
    } else if (begrunnelse === 'EGEN_ANSATT') {
        return 'sykefravaer.veileder.feilmelding.EGENANSATT.melding';
    }
    return 'feilmelding.generell.feil';
};
