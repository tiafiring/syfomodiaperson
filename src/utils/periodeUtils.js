export const tidligsteFom = (perioder) => {
    return perioder.map((p) => { return p.fom; }).sort((p1, p2) => {
        if (p1 > p2) {
            return 1;
        } else if (p1 < p2) {
            return -1;
        } return 0;
    })[0];
};

export const senesteTom = (perioder) => {
    return perioder.map((p) => { return p.tom; }).sort((p1, p2) => {
        if (p1 < p2) {
            return 1;
        } else if (p1 > p2) {
            return -1;
        } return 0;
    })[0];
};

export const periodeOverlapperMedPeriode = (periodeA_, periodeB_) => {
    const periodeA = periodeA_;
    const periodeB = periodeB_;
    try {
        const forstePeriode = new Date(periodeA.fom).getTime() < new Date(periodeB.fom).getTime() ? periodeA : periodeB;
        const andrePeriode = new Date(periodeA.fom).getTime() < new Date(periodeB.fom).getTime() ? periodeB : periodeA;
        return new Date(forstePeriode.tom).getTime() >= new Date(andrePeriode.fom).getTime();
    } catch (e) {
        return false;
    }
};

export const tilfellerFromTilfelleperioder = (oppfolgingstilfelleperioder) => {
    return Object.keys(oppfolgingstilfelleperioder).map((orgnummer) => {
        const perioder = oppfolgingstilfelleperioder[orgnummer].data;
        const fom = tidligsteFom(perioder);
        const tom = senesteTom(perioder);

        return { fom, tom };
    }).filter((element) => {
        return !!element.fom && !!element.tom;
    });
};

