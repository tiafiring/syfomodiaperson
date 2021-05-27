module.exports = getDialogmoter = () => {
  return [
    {
      uuid: "b887c136-e2b8-4c06-b18c-18539bccf322",
      createdAt: "2021-05-26T12:56:26.238385",
      updatedAt: "2021-05-26T12:56:26.238385",
      status: "INNKALT",
      opprettetAv: "Z999999",
      tildeltVeilederIdent: "Z999999",
      tildeltEnhet: "1000",
      arbeidstaker: {
        uuid: "49cf9990-b552-4be3-a60c-47284f08d1f9",
        personIdent: "12345678912",
        type: "ARBEIDSTAKER",
        varselList: [
          {
            uuid: "8e726dac-eeeb-4f0d-99d7-e84d3b5d7bc6",
            createdAt: "2021-05-26T12:56:26.271381",
            varselType: "INNKALT",
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
        uuid: "028ed5e4-36cb-473a-bc0b-6c8fc41fb068",
        virksomhetsnummer: "912345678",
        lederNavn: "He-man",
        lederEpost: null,
        type: "ARBEIDSGIVER",
        varselList: [
          {
            uuid: "f940408e-53ad-42bb-8bd4-0a7bdab0114d",
            createdAt: "2021-05-26T12:56:26.282386",
            varselType: "INNKALT",
            lestDato: "2021-05-26T12:56:26.271381",
            fritekst: "Ipsum lorum arbeidsgiver",
            document: [],
          },
        ],
      },
      sted:
        "This is a very lang text that has a lot of characters and describes where the meeting will take place.",
      tid: "2021-06-25T12:56:23.539843",
      videoLink: "https://meet.google.com/xyz",
    },
  ];
};
