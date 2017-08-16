export const getTidligsteSendtDato = (soknad) => {
    if (new Date(soknad.sendtTilNAVDato) && new Date(soknad.sendtTilArbeidsgiverDato)) {
        return new Date(soknad.sendtTilNAVDato) > new Date(soknad.sendtTilArbeidsgiverDato) ? new Date(soknad.sendtTilArbeidsgiverDato) : new Date(soknad.sendtTilNAVDato);
    }
    return new Date(soknad.sendtTilNAVDato) || new Date(soknad.sendtTilArbeidsgiverDato);
};

export const sorterEtterDato = (soknad1, soknad2) => {
    const dato1 = new Date(getTidligsteSendtDato(soknad1));
    const dato2 = new Date(getTidligsteSendtDato(soknad2));


    if (dato1.getTime() > dato2.getTime()) {
        return -1;
    }
    if (dato1.getTime() < dato2.getTime()) {
        return 1;
    }
    return 0;
};
