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

export const finnLedereUtenInnsendtMotebehov = (ledereData, motebehovData) => {
    const ledereFiltrertPaaArbeidstakersMotebehov = filtrerLederePaaArbeidstakersMotebehov(ledereData, motebehovData);
    return fjernLedereMedInnsendtMotebehov(ledereFiltrertPaaArbeidstakersMotebehov, motebehovData);
};
