import {
    senesteTom,
    tidligsteFom,
} from './periodeUtils';
import {
    erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
    erOppfolgingstilfelleSluttDatoPassert,
    harArbeidstakerSvartPaaMotebehov,
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
    const arbeidstakerHarSvartPaaMotebehov = motebehovData && harArbeidstakerSvartPaaMotebehov(motebehovData);

    const filtrertLederListe = arbeidstakerHarSvartPaaMotebehov
        ? filtrerLederePaaArbeidstakersMotebehov(ledereData, motebehovData)
        : filtrerLederePaaOppfolgingstilfelleperioder(ledereData, oppfolgingstilfelleperioder);
    return fjernLedereMedInnsendtMotebehov(filtrertLederListe, motebehovData);
};
