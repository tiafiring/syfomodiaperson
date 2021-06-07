import {
  DialogmoteStatus,
  MotedeltakerVarselType,
} from "../../src/data/dialogmote/dialogmoteTypes";

const createDialogmote = (
  uuid: string,
  moteStatus: DialogmoteStatus,
  varselType: MotedeltakerVarselType,
  moteTid: string
) => {
  return {
    uuid: uuid,
    createdAt: "2021-05-26T12:56:26.238385",
    updatedAt: "2021-05-26T12:56:26.238385",
    status: moteStatus.toString(),
    opprettetAv: "Z999999",
    tildeltVeilederIdent: "Z999999",
    tildeltEnhet: "1000",
    arbeidstaker: {
      uuid: uuid + 1,
      personIdent: "12345678912",
      type: "ARBEIDSTAKER",
      varselList: [
        {
          uuid: uuid + 2,
          createdAt: "2021-05-26T12:56:26.271381",
          varselType: varselType.toString(),
          digitalt: true,
          lestDato: "2021-05-26T12:56:26.271381",
          fritekst: "Ipsum lorum arbeidstaker",
          document: [
            { type: "PARAGRAPH", title: "Tittel innkalling", texts: [] },
            { type: "PARAGRAPH", title: "Møtetid:", texts: ["5. mai 2021"] },
            { type: "PARAGRAPH", title: null, texts: ["Brødtekst"] },
            { type: "LINK", title: null, texts: ["https://nav.no/"] },
            {
              type: "PARAGRAPH",
              title: null,
              texts: ["Vennlig hilsen", "NAV Staden", "Kari Saksbehandler"],
            },
          ],
        },
      ],
    },
    arbeidsgiver: {
      uuid: uuid + 3,
      virksomhetsnummer: "912345678",
      lederNavn: "He-man",
      lederEpost: null,
      type: "ARBEIDSGIVER",
      varselList: [
        {
          uuid: uuid + 4,
          createdAt: "2021-05-26T12:56:26.282386",
          varselType: varselType,
          lestDato: "2021-05-26T12:56:26.271381",
          fritekst: "Ipsum lorum arbeidsgiver",
          document: [],
        },
      ],
    },
    sted:
      "This is a very lang text that has a lot of characters and describes where the meeting will take place.",
    tid: moteTid,
    videoLink: "https://meet.google.com/xyz",
  };
};

export const innkaltDialogmote = createDialogmote(
  "1",
  DialogmoteStatus.INNKALT,
  MotedeltakerVarselType.INNKALT,
  "2021-06-25T14:22:23.539843"
);
export const avlystDialogmote = createDialogmote(
  "2",
  DialogmoteStatus.AVLYST,
  MotedeltakerVarselType.AVLYST,
  "2021-01-15T11:52:13.539843"
);
export const ferdigstiltDialogmote = createDialogmote(
  "3",
  DialogmoteStatus.FERDIGSTILT,
  MotedeltakerVarselType.REFERAT,
  "2020-03-21T12:34:23.539843"
);

export const dialogmoterMock = [
  innkaltDialogmote,
  avlystDialogmote,
  ferdigstiltDialogmote,
];
