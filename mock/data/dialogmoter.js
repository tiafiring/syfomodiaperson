function generateUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const createDialogmote = (moteStatus, varselType, moteTid) => {
  return {
    uuid: generateUuid(),
    createdAt: "2021-05-26T12:56:26.238385",
    updatedAt: "2021-05-26T12:56:26.238385",
    status: moteStatus,
    opprettetAv: "Z999999",
    tildeltVeilederIdent: "Z999999",
    tildeltEnhet: "1000",
    arbeidstaker: {
      uuid: generateUuid(),
      personIdent: "12345678912",
      type: "ARBEIDSTAKER",
      varselList: [
        {
          uuid: generateUuid(),
          createdAt: "2021-05-26T12:56:26.271381",
          varselType: varselType,
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
      uuid: generateUuid(),
      virksomhetsnummer: "912345678",
      lederNavn: "He-man",
      lederEpost: null,
      type: "ARBEIDSGIVER",
      varselList: [
        {
          uuid: generateUuid(),
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

module.exports = getDialogmoter = () => {
  const innkaltMote = createDialogmote(
    "INNKALT",
    "INNKALT",
    "2021-06-25T14:22:23.539843"
  );
  const avlystMote = createDialogmote(
    "AVLYST",
    "AVLYST",
    "2021-01-15T11:52:13.539843"
  );
  const avholdtMote = createDialogmote(
    "FERDIGSTILT",
    "INNKALT",
    "2020-03-21T12:34:23.539843"
  );
  return [innkaltMote, avlystMote, avholdtMote];
};
