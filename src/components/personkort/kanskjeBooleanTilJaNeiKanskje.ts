const kanskjeBooleanTilJaNeiKanskje = (kanskjeBoolean?: boolean) => {
  if (kanskjeBoolean === null) {
    return "Ikke oppgitt";
  }
  return kanskjeBoolean ? "Ja" : "Nei";
};

export default kanskjeBooleanTilJaNeiKanskje;
