const kortManeder = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

export const visDato = (dato) => {
    const maned = kortManeder[dato.monthValue - 1];
    return `${dato.dayOfMonth}. ${maned} ${dato.year}`;
};

export const lagNummer = (streng) => {
    return streng.replace(/[^\d.-]/g, '').replace(/-/g, '');
};

export const formaterDato = (input) => {
    const grupper = lagNummer(input).split('.');
    let dato = grupper.join('');
    if (dato.length > 2 || grupper.length > 1) {
        dato = dato.replace(/(.{2})/, '$1.');
        if (dato.length >= 6 || grupper.length > 2) {
            dato = dato.replace(/(.{5})/, '$1.');
        }
    }
    return dato;
};

export const formaterTid = (input) => {
    const grupper = lagNummer(input).split('.');
    const tid = grupper.join('');
    if (tid.length > 2 || grupper.length > 1) {
        return tid.replace(/(.{2})/, '$1.');
    }
    return tid;
};

export const getCookieValue = (name, defaultvalue) => {
    const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) {
        return match[1];
    } else {
        return defaultvalue;
    }
};

export const hentDag = (input) => {
    const date = new Date(input);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
        return "Søndag";
    } else if (dayOfWeek === 1) {
        return "Mandag";
    } else if (dayOfWeek === 2) {
        return "Tirsdag";
    } else if (dayOfWeek === 3) {
        return "Onsdag";
    } else if (dayOfWeek === 4) {
        return "Torsdag";
    } else if (dayOfWeek === 5) {
        return "Fredag";
    } else if (dayOfWeek === 6) {
        return "Lørdag";
    }
};

