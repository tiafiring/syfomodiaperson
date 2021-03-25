const getFastleger = () => {
  return [
    {
      fornavn: "Lego",
      mellomnavn: "Las",
      etternavn: "Legesen",
      fnr: "99900011122",
      herId: 7777777,
      helsepersonellregisterId: "8888888",
      pasient: {
        fnr: "19026900010",
        fornavn: 'Samuel "Sam"',
        mellomnavn: "Peyton",
        etternavn: "Jones",
      },
      fastlegekontor: {
        navn: "PONTYPANDY LEGEKONTOR.",
        besoeksadresse: {
          adresse: "Branngata 2",
          postnummer: "1400",
          poststed: "Pontypandy",
        },
        postadresse: {
          adresse: "144",
          postnummer: "1400",
          poststed: "Pontypandy",
        },
        telefon: "12345678",
        epost: "pontypandy@edi.nhn.no",
        orgnummer: "000999000",
      },
      pasientforhold: {
        fom: "2011-10-01",
        tom: "9999-12-31",
      },
    },
  ];
};

module.exports = {
  getFastleger,
};
