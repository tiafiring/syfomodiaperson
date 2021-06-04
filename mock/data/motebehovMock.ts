const motebehovArbeidstakerUbehandletMock = {
  UUID:
    "11111111-c987-4b57-a401-a3915ec11429198a6dbf-c987-4b57-a401-a3915ec11429",
  id: "11111111-ee10-44b6-bddf-54d049ef25f9",
  opprettetDato: "2021-12-08T13:53:57.047+01:00",
  aktorId: "1",
  opprettetAv: "1",
  virksomhetsnummer: "110110110",
  motebehovSvar: {
    harMotebehov: true,
    friskmeldingForventning: "Nei",
    tiltak: "",
    tiltakResultat: "",
    forklaring: "",
  },
  tildeltEnhet: "0330",
  behandletTidspunkt: null,
  behandletVeilederIdent: null,
};

const motebehovArbeidstakerBehandletMock = {
  UUID: "33333333-c987-4b57-a401-a3915ec11411",
  id: "33333333-ee10-44b6-bddf-54d049ef25f2",
  opprettetDato: "2019-01-08T13:53:57.047+01:00",
  aktorId: "1",
  opprettetAv: "1",
  virksomhetsnummer: "000999000",
  motebehovSvar: {
    harMotebehov: true,
    friskmeldingForventning: "Nei",
    tiltak: "",
    tiltakResultat: "",
    forklaring: "Møter er bra!",
  },
  tildeltEnhet: "0330",
  behandletTidspunkt: "2019-01-10T13:53:57.047+01:00",
  behandletVeilederIdent: "Z990000",
};

const motebehovArbeidsgiverMock = {
  UUID: "22222222-c987-4b57-a401-a3915ec11421",
  id: "22222222-9e9b-40b0-bd1c-d1c39dc5f481",
  opprettetDato: "2021-12-08T13:53:57.047+01:00",
  aktorId: "1",
  opprettetAv: "1902690001009",
  virksomhetsnummer: "110110110",
  motebehovSvar: {
    harMotebehov: false,
    friskmeldingForventning: "Nei",
    tiltak: "",
    tiltakResultat: "",
    forklaring: "Jeg liker ikke møte!!",
  },
  tildeltEnhet: "0330",
  behandletTidspunkt: null,
  behandletVeilederIdent: null,
};

export const motebehovMock = [
  motebehovArbeidstakerUbehandletMock,
  motebehovArbeidstakerBehandletMock,
  motebehovArbeidsgiverMock,
];
