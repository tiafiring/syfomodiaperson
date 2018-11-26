export const sorterMotebehovDataEtterDato = (a, b) => {
    return b.opprettetDato === a.opprettetDato ? 0 : b.opprettetDato > a.opprettetDato ? 1 : -1;
};

export const finnNyesteMotebehovsvarFraHverDeltaker = (sortertMotebehovListe) => {
    return sortertMotebehovListe.filter((motebehov1, index) => {
        return sortertMotebehovListe.findIndex(motebehov2 => {
            return motebehov1.opprettetAv === motebehov2.opprettetAv;
        }) === index;
    });
};

export const filtrerMotebehovPaaVirksomhetsnummer = (motebehovData, virksomhetsnummer) => {
    return motebehovData.filter((motebehov) => {
        return motebehov.virksomhetsnummer === virksomhetsnummer;
    });
};

export const finnArbeidsgiverMotebehovSvar = (motebehovListe) => {
    return motebehovListe.find((motebehov) => {
        return motebehov.opprettetAv !== motebehov.aktorId;
    });
};

export const finnArbeidstakerMotebehovSvar = (motebehovListe) => {
    return motebehovListe.find((motebehov) => {
        return motebehov.opprettetAv === motebehov.aktorId;
    });
};
