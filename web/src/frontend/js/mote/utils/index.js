export const pad = (nr) => {
    return nr > 9 || nr.length > 1 ? nr : `0${nr}`;
};

export const getDatoFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getTidFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    return `${getDatoFraZulu(zulutid)} kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};

export const hentVirksomhetHvis9Siffer = (e, hentVirksomhet, nullstillVirksomhet) => {
    const input = e.target.value;
    if (input.length === 9 && !isNaN(input)) {
        hentVirksomhet(input);
    } else {
        nullstillVirksomhet();
    }
};

export const virksomhetsnavn = (virksomhet) => {
    if (!virksomhet) {
        return '';
    }
    if (virksomhet.hentingFeilet) {
        return 'Fant ikke virksomhet';
    } else if (virksomhet.henter) {
        return 'henter virksomhet...';
    } else if (virksomhet.nullstilt) {
        return '';
    }
    return virksomhet.data.navn;
};
