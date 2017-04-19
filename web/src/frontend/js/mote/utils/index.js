export const pad = (nr) => {
    return nr > 9 || nr.length > 1 ? nr : `0${nr}`;
};

export const getDatoFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()}`;
};

export const getKlokkeslettFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    return `kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};

export const getTidFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    return `${getDatoFraZulu(zulutid)} kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};

export function genererDato(dato, klokkeslett) {
    const s = new Date();
    const datoArr = dato.split('.');
    const klokkeslettArr = klokkeslett.split('.');
    const aar = datoArr[2];
    const aarPadded = aar.length === 2 ? `20${aar}` : aar;
    s.setDate(datoArr[0]);
    s.setMonth(parseInt(datoArr[1], 10) - 1);
    s.setYear(aarPadded);
    s.setUTCHours(klokkeslettArr[0]);
    s.setMinutes(klokkeslettArr[1]);
    s.setSeconds('00');
    s.setMilliseconds('000');
    return s.toJSON();
}

export function erGyldigEpost(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function erGyldigKlokkeslett(klokkeslett) {
    const re = /^([0-9]|0[0-9]|1[0-9]|2[0-3])\.[0-5][0-9]$/;
    return re.test(klokkeslett);
}

export function erGyldigDato(dato) {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return re.test(dato);
}

export const fikkIkkeMoteOpprettetVarsel = (deltaker) => {
    const hendelser = deltaker.hendelser || [];
    return hendelser.filter(hendelse => {
        return hendelse.resultat !== 'OK' && hendelse.varseltype === 'OPPRETTET';
    })[0];
};

export const fikkMoteOpprettetVarsel = (deltaker) => {
    return !fikkIkkeMoteOpprettetVarsel(deltaker);
};

export const erAlleAlternativerPassert = (alternativer) => {
    const morgendagen = new Date();
    morgendagen.setHours(0, 0, 0);
    return alternativer.filter((alternativ) => {
        return alternativ.tid > morgendagen;
    }).length === 0;
};
