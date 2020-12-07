import React from "react";

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export const formaterBostedsadresse = (bostedsadresse: any) => {
  if (bostedsadresse) {
    if (bostedsadresse.vegadresse) {
      return formaterVegadresse(bostedsadresse.vegadresse);
    } else if (bostedsadresse.matrikkeladresse) {
      return formaterMatrikkeladresse(bostedsadresse.matrikkeladresse);
    } else if (bostedsadresse.utenlandskAdresse) {
      return formaterUtenlandskAdresse(bostedsadresse.utenlandskAdresse);
    } else if (bostedsadresse.ukjentBosted) {
      return formaterUkjentBosted(bostedsadresse.ukjentBosted);
    }
  }
  return <span className="adresselinje">{EMDASH}</span>;
};

export const formaterKontaktadresse = (kontaktadresse: any) => {
  if (kontaktadresse) {
    const kontaktadresseType = kontaktadresse && kontaktadresse.type;
    if (kontaktadresseType === "Innland") {
      return formaterKontaktadresseInnland(kontaktadresse);
    } else if (kontaktadresseType === "Utland") {
      return formaterKontaktadresseUtland(kontaktadresse);
    }
  }
  return <span className="adresselinje">{EMDASH}</span>;
};

export const formaterKontaktadresseInnland = (kontaktadresse: any) => {
  if (kontaktadresse) {
    if (kontaktadresse.postboksadresse) {
      return formaterPostboksadresse(kontaktadresse.postboksadresse);
    } else if (kontaktadresse.vegadresse) {
      return formaterVegadresse(kontaktadresse.vegadresse);
    } else if (kontaktadresse.postadresseIFrittFormat) {
      return formaterPostadresseIFrittFormat(
        kontaktadresse.postadresseIFrittFormat
      );
    }
  }
  return <span className="adresselinje">{EMDASH}</span>;
};

export const formaterKontaktadresseUtland = (kontaktadresse: any) => {
  if (kontaktadresse) {
    if (kontaktadresse.utenlandskAdresse) {
      return formaterUtenlandskAdresse(kontaktadresse.utenlandskAdresse);
    } else if (kontaktadresse.utenlandskAdresseIFrittFormat) {
      return formaterUtenlandskAdresseIFrittFormat(
        kontaktadresse.utenlandskAdresseIFrittFormat
      );
    }
  }
  return <span className="adresselinje">{EMDASH}</span>;
};

export const formaterOppholdsadresse = (oppholdsadresse: any) => {
  if (oppholdsadresse) {
    if (oppholdsadresse.vegadresse) {
      return formaterVegadresse(oppholdsadresse.vegadresse);
    } else if (oppholdsadresse.matrikkeladresse) {
      return formaterMatrikkeladresse(oppholdsadresse.matrikkeladresse);
    } else if (oppholdsadresse.utenlandskAdresse) {
      return formaterUtenlandskAdresse(oppholdsadresse.utenlandskAdresse);
    } else if (oppholdsadresse.oppholdAnnetSted) {
      return formaterOppholdAnnetSted(oppholdsadresse.oppholdAnnetSted);
    }
  }
  return <span className="adresselinje">{EMDASH}</span>;
};

const formaterOppholdAnnetSted = (oppholdAnnetSted: any) => {
  return hentAdresseRader(oppholdAnnetSted || "", "", "", "", "");
};

const formaterPostboksadresse = (postboksadresse: any) => {
  return hentAdresseRader(
    postboksadresse.postbokseier || "",
    postboksadresse.postboks,
    postboksadresse.postnummer || "",
    "",
    ""
  );
};

const formaterPostadresseIFrittFormat = (postadresseIFrittFormat: any) => {
  return hentAdresseRader(
    postadresseIFrittFormat.adresselinje1 || "",
    postadresseIFrittFormat.adresselinje2 || "",
    postadresseIFrittFormat.adresselinje3 || "",
    postadresseIFrittFormat.postnummer || "",
    ""
  );
};

const formaterVegadresse = (vegadresse: any) => {
  return hentAdresseRader(
    `${vegadresse.adressenavn || ""} ${vegadresse.husnummer || ""} ${
      vegadresse.husbokstav || ""
    }`,
    vegadresse.tilleggsnavn || "",
    vegadresse.postnummer,
    vegadresse.land || "",
    ""
  );
};

const formaterMatrikkeladresse = (matrikkeladresse: any) => {
  return hentAdresseRader(
    matrikkeladresse.bruksenhetsnummer || "",
    matrikkeladresse.tilleggsnavn || "",
    matrikkeladresse.postnummer || "",
    matrikkeladresse.kommunenummer || "",
    ""
  );
};

const formaterUtenlandskAdresse = (utenlandskAdresse: any) => {
  return hentAdresseRader(
    `${utenlandskAdresse.adressenavnNummer} ${utenlandskAdresse.bygningEtasjeLeilighet}`,
    utenlandskAdresse.postboksNummerNavn || "",
    utenlandskAdresse.postkode || "",
    `${utenlandskAdresse.bySted || ""} ${
      utenlandskAdresse.regionDistriktOmraade || ""
    } `,
    utenlandskAdresse.landkode
  );
};

const formaterUtenlandskAdresseIFrittFormat = (
  utenlandskAdresseIFrittFormat: any
) => {
  return hentAdresseRader(
    utenlandskAdresseIFrittFormat.adresselinje1 || "",
    utenlandskAdresseIFrittFormat.adresselinje2 || "",
    utenlandskAdresseIFrittFormat.adresselinje3 || "",
    `${utenlandskAdresseIFrittFormat.postkode || ""} ${
      utenlandskAdresseIFrittFormat.byEllerStedsnavn || ""
    }`,
    utenlandskAdresseIFrittFormat.landkode
  );
};

const formaterUkjentBosted = (ukjentBosted: any) => {
  return hentAdresseRader(ukjentBosted.bostedskommune || "", "", "", "", "");
};

const hentAdresseRader = (
  rad1: any,
  rad2: any,
  rad3: any,
  rad4: any,
  rad5: any
) => {
  return (
    <div>
      <span className="adresselinje">{rad1}</span>
      <span className="adresselinje">{rad2}</span>
      <span className="adresselinje">{rad3}</span>
      <span className="adresselinje">{rad4}</span>
      <span className="adresselinje">{rad5}</span>
    </div>
  );
};
