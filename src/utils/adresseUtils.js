import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnMidlertidigAdresseTittel = (navbruker) => {
    if (navbruker.midlertidigAdresseNorge) {
        return getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse.midlertidig-norge');
    } else if (navbruker.midlertidigAdresseUtland) {
        return getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse.midlertidig-utland');
    }
    return getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse.midlertidig');
};

export const finnPostadresseTittel = (navbruker) => {
    const postadresse = navbruker.postAdresse;
    if (postadresse && postadresse.ustrukturertAdresse && postadresse.ustrukturertAdresse.landkode) {
        if (postadresse.ustrukturertAdresse.landkode === 'NOR' ||
            postadresse.ustrukturertAdresse.landkode === 'NORGE') {
            return getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse.postadresse-norge');
        }
        return getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse.postadresse-utland');
    }
    return getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse.postadresse');
};

const visLand = (land) => {
    const NORGE_KODE = 'NOR';
    const NORGE_NAVN = 'NORGE';
    if (land) {
        return (land.toUpperCase() !== NORGE_KODE && land.toUpperCase() !== NORGE_NAVN);
    }
    return false;
};

const hentAdresseRader = (rad1, rad2, rad3, rad4, rad5) => {
    return (<div>
        <span className="adresselinje">{rad1}</span>
        <span className="adresselinje">{rad2}</span>
        <span className="adresselinje">{rad3}</span>
        <span className="adresselinje">{rad4}</span>
        <span className="adresselinje">{rad5}</span>
    </div>);
};

const formatterGateadresse = (adresse, erMidlertidigAdresse) => {
    const land = visLand(adresse.landkode) ? `${adresse.landkode}` : '';
    const husnummer = adresse.husnummer ? ` ${adresse.husnummer}` : '';
    const tilleggsadresse = erMidlertidigAdresse ? '' : adresse.tilleggsadresse || '';

    return hentAdresseRader(`${adresse.gatenavn}${husnummer}${adresse.husbokstav || ''}`, tilleggsadresse,
        `${adresse.postnummer} ${adresse.poststed || ''}`, land, '');
};

const formatterMatrikkeladresse = (adresse, erMidlertidigAdresse) => {
    const land = visLand(adresse.landkode) ? `${adresse.landkode}` : '';
    const festenr = adresse.festenummer ? `/${adresse.festenummer}` : '';
    const tilleggsadresse = erMidlertidigAdresse ? '' : adresse.tilleggsadresse || '';

    if (adresse.eiendomsnavn) {
        return hentAdresseRader(adresse.eiendomsnavn, tilleggsadresse,
            `${adresse.postnummer} ${adresse.poststed || ''}`, land, '');
    }
    return hentAdresseRader(`${adresse.gardsnummer}/${adresse.bruksnummer}${festenr}`, tilleggsadresse,
        `${adresse.postnummer} ${adresse.poststed || ''}`, land, '');
};

const formatterPostboksadresse = (adresse, erMidlertidigAdresse) => {
    const postboksanlegg = adresse.postboksanlegg ? `${adresse.postboksanlegg} ` : '';
    const land = visLand(adresse.landkode) ? `${adresse.landkode}` : '';
    const tilleggsadresse = erMidlertidigAdresse ? '' : adresse.tilleggsadresse || '';

    return hentAdresseRader(`${postboksanlegg}Postboks ${adresse.postboksnummer}`, tilleggsadresse,
        `${adresse.postnummer} ${adresse.poststed || ''}`, land, '');
};

export const formatterNorskAdresse = (adresse, erMidlertidigAdresse) => {
    if (adresse && adresse.strukturertAdresse) {
        if (adresse.strukturertAdresse.gateadresse) {
            return formatterGateadresse(adresse.strukturertAdresse.gateadresse, erMidlertidigAdresse);
        } else if (adresse.strukturertAdresse.matrikkeladresse) {
            return formatterMatrikkeladresse(adresse.strukturertAdresse.matrikkeladresse, erMidlertidigAdresse);
        } else if (adresse.strukturertAdresse.postboksadresseNorsk) {
            return formatterPostboksadresse(adresse.strukturertAdresse.postboksadresseNorsk, erMidlertidigAdresse);
        }
    }
    return <span className="adresselinje">{EMDASH}</span>;
};

export const formatterUstrukturertAdresse = (adresse, ikkePostadresse) => {
    if (adresse && adresse.ustrukturertAdresse) {
        const land = (visLand(adresse.ustrukturertAdresse.landkode) && ikkePostadresse) ?
            `${adresse.ustrukturertAdresse.landkode}` : '';
        return hentAdresseRader(adresse.ustrukturertAdresse.adresselinje1, adresse.ustrukturertAdresse.adresselinje2,
            adresse.ustrukturertAdresse.adresselinje3, adresse.ustrukturertAdresse.adresselinje4, land);
    }
    return <span className="adresselinje">{EMDASH}</span>;
};

export const finnMidlertidigAdresseTekst = (navbruker) => {
    if (navbruker.midlertidigAdresseNorge) {
        return formatterNorskAdresse(navbruker.midlertidigAdresseNorge, true);
    } else if (navbruker.midlertidigAdresseUtland) {
        return formatterUstrukturertAdresse(navbruker.midlertidigAdresseUtland, true);
    }
    return <span className="adresselinje">{EMDASH}</span>;
};
