module.exports = getDialogmoter = () => {
  return [
    {
      uuid: "dca7247e-4493-4c8b-b595-6681d4251eea",
      createdAt: "2021-05-05T09:34:55.541341",
      updatedAt: "2021-05-05T09:34:55.541341",
      planlagtMoteUuid: "81982aad-b6f0-443d-923c-a7588a2191f0",
      planlagtMoteBekreftetTidspunkt: null,
      status: "INNKALT",
      opprettetAv: "Z999999",
      tildeltVeilederIdent: "Z999999",
      tildeltEnhet: "1000",
      arbeidstaker: {
        uuid: "8c66a07f-638d-4c84-9386-b4dad947e539",
        personIdent: "12345678912",
        type: "ARBEIDSTAKER",
        varselList: [],
      },
      arbeidsgiver: {
        uuid: "0d532900-4f7c-47a1-b8cd-5e85c2027957",
        virksomhetsnummer: "912345678",
        lederNavn: "He-man",
        lederEpost: null,
        type: "ARBEIDSGIVER",
      },
      tidStedList: [
        {
          uuid: "e88a0f9c-89ab-4fae-9713-78cd598a2079",
          sted:
            "This is a very lang text that has a lot of characters and describes where the meeting will take place.",
          tid: "2021-06-04T09:34:55.422796",
          videoLink: "https://meet.google.com/xyz",
        },
      ],
    },
  ];
};
