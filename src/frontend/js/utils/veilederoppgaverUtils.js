export const getGjeldendeMotebehovOppgaver = (oppgaveListe, motebehovListe) => {
    return oppgaveListe.filter((oppgave) => {
        return oppgave.type === 'MOTEBEHOV_MOTTATT' && motebehovListe.findIndex((motebehov) => {
            return oppgave.uuid === motebehov.id;
        }) >= 0;
    });
};

export const getIkkeFullforteOppgaver = (oppgaveListe) => {
    return oppgaveListe.filter((oppgave) => {
        return oppgave.status !== 'FERDIG';
    });
};

export const getSistEndretOppgave = (gjeldendeOppgaver) => {
    return gjeldendeOppgaver.sort((oppgave1, oppgave2) => {
        return oppgave2.sistEndret === oppgave1.sistEndret ? 0 : oppgave2.sistEndret > oppgave1.sistEndret ? 1 : -1;
    })[0];
};
