module.exports = getBrukerinfo = () => {
  return {
    navn: 'Samuel "Sam" Jones',
    kontaktinfo: {
      fnr: "19026900010",
      epost: "samuel@pontypandyfire.gov.uk",
      tlf: "99887766",
      skalHaVarsel: true,
      feilAarsak: "KONTAKTINFO_IKKE_FUNNET",
    },
    arbeidssituasjon: "ARBEIDSTAKER",
    bostedsadresse: {
      strukturertAdresse: {
        landkode: "NOR",
        tilleggsadresse: null,
        gateadresse: {
          landkode: null,
          tilleggsadresse: null,
          gateadresse: null,
          matrikkeladresse: null,
          postboksadresseNorsk: null,
          poststed: null,
          postnummer: "0579",
          husnummer: 94,
          husbokstav: null,
          kommunenummer: "0301",
          gatenavn: "Økernveien",
          bolignummer: null,
          gatenummer: null,
        },
        matrikkeladresse: null,
        postboksadresseNorsk: null,
      },
    },
    midlertidigAdresseNorge: null,
    midlertidigAdresseUtland: null,
    postAdresse: null,
  };
};
