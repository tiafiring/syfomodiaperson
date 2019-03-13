import {
    senesteTom,
    tidligsteFom,
} from './periodeUtils';
import {
    erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
    erOppfolgingstilfelleSluttDatoPassert,
} from './motebehovUtils';

export const filtrerLederePaaArbeidstakersMotebehov = (ledereData, motebehovData) => {
    return ledereData.filter((leder) => {
        return motebehovData.findIndex((motebehov) => {
            return motebehov.opprettetAv === motebehov.aktorId && leder.orgnummer === motebehov.virksomhetsnummer;
        }) >= 0;
    });
};

export const fjernLedereMedInnsendtMotebehov = (ledereListe, motebehovData) => {
    return ledereListe.filter((leder) => {
        return motebehovData.findIndex((motebehov) => {
            return motebehov.opprettetAv !== motebehov.aktorId && motebehov.virksomhetsnummer === leder.orgnummer;
        }) < 0;
    });
};

export const filtrerLederePaaOppfolgingstilfelleperioder = (ledereData, oppfolgingstilfelleperioder) => {
    return ledereData.filter((leder) => {
        const startOppfolgingsdato = oppfolgingstilfelleperioder[leder.orgnummer] && oppfolgingstilfelleperioder[leder.orgnummer].data
            ? tidligsteFom(oppfolgingstilfelleperioder[leder.orgnummer].data)
            : new Date();
        const sluttOppfolgingsdato = oppfolgingstilfelleperioder[leder.orgnummer] && oppfolgingstilfelleperioder[leder.orgnummer].data
            ? senesteTom(oppfolgingstilfelleperioder[leder.orgnummer].data)
            : new Date();


        return (startOppfolgingsdato && sluttOppfolgingsdato)
            && !erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato)
            && erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(startOppfolgingsdato);
    });
};


export const finnLedereUtenInnsendtMotebehov = (ledereData, motebehovData, oppfolgingstilfelleperioder) => {
    const ledereFiltrertPaaOppfolgingstilfelleperioder = filtrerLederePaaOppfolgingstilfelleperioder(ledereData, oppfolgingstilfelleperioder);
    return fjernLedereMedInnsendtMotebehov(ledereFiltrertPaaOppfolgingstilfelleperioder, motebehovData);
};
