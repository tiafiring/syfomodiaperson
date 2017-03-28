const kortManeder = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

export const visDato = (dato) => {
    const maned = kortManeder[dato.monthValue - 1];
    return `${dato.dayOfMonth}. ${maned} ${dato.year}`;
};

export const lagNummer = (streng) => {
    return streng.replace(/[^\d.-]/g, '').replace(/-/g, '');
};

export const formaterTid = (input) => {
    const grupper = lagNummer(input).split('.');
    const tid = grupper.join('');
    if (tid.length > 2 || grupper.length > 1) {
        return tid.replace(/(.{2})/, '$1.');
    }
    return tid;
};

export const getCookieValueorDefault = (name, defaultvalue) => {
    const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
    if (match) {
        return match[1];
    }
    return defaultvalue;
};

export const hentDag = (input) => {
    const date = new Date(input);
    const dayOfWeek = date.getDay();
    return dager[dayOfWeek];
};

