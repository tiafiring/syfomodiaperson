import {
    senesteTom,
    tidligsteFom,
} from './periodeUtils';
import {
    erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
    erOppfolgingstilfelleSluttDatoPassert,
    harArbeidstakerSvartPaaMotebehov,
} from './motebehovUtils';
import { activeSykmeldingerSentToArbeidsgiver } from './sykmeldinger/sykmeldingUtils';

export const ledereIVirksomheterMedMotebehovsvarFraArbeidstaker = (ledereData, motebehovData) => {
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

export const ledereMedOppfolgingstilfelleInnenforMotebehovperioden = (ledereData, oppfolgingstilfelleperioder) => {
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


export const ledereUtenMotebehovsvar = (ledereData, motebehovData, oppfolgingstilfelleperioder) => {
    const arbeidstakerHarSvartPaaMotebehov = motebehovData && harArbeidstakerSvartPaaMotebehov(motebehovData);

    const filtrertLederListe = arbeidstakerHarSvartPaaMotebehov
        ? ledereIVirksomheterMedMotebehovsvarFraArbeidstaker(ledereData, motebehovData)
        : ledereMedOppfolgingstilfelleInnenforMotebehovperioden(ledereData, oppfolgingstilfelleperioder);
    return fjernLedereMedInnsendtMotebehov(filtrertLederListe, motebehovData);
};

export const lederHasActiveSykmelding = (leder, sykmeldinger) => {
    const activeSykmeldingerWithArbeidsgiver = activeSykmeldingerSentToArbeidsgiver(sykmeldinger);

    return activeSykmeldingerWithArbeidsgiver.findIndex((sykmelding) => {
        return sykmelding.mottakendeArbeidsgiver.virksomhetsnummer === leder.orgnummer;
    }) > -1;
};

export const ledereWithActiveLedereFirst = (ledereData, sykmeldinger) => {
    return ledereData.sort((leder1, leder2) => {
        const leder1Active = lederHasActiveSykmelding(leder1, sykmeldinger);
        const leder2Active = lederHasActiveSykmelding(leder2, sykmeldinger);

        if (leder1Active && !leder2Active) {
            return -1;
        }
        if (leder2Active && !leder1Active) {
            return 1;
        }
        return 0;
    });
};
