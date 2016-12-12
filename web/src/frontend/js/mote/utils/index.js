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

