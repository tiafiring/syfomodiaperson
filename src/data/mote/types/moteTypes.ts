interface MoteAlternativ {
  id: number;
  tid: Date;
  created: Date;
  sted: string;
  valgt: boolean;
}

interface MoteSvar {
  id: number;
  tid: Date;
  created: Date;
  sted: string;
  valgt: boolean;
}

interface MoteDeltaker {
  navn: string;
  orgnummer: string;
  type: MoteDeltakerType;
  svar: MoteSvar[];
  svartidspunkt: Date;
}

interface Mote {
  moteUuid: string;
  status: string;
  fnr: string;
  opprettetTidspunkt: Date;
  bekreftetTidspunkt: Date;
  deltakere: MoteDeltaker[];
  alternativer: MoteAlternativ[];
}

enum MoteDeltakerType {
  BRUKER = "Bruker",
  ARBEIDSGIVER = "arbeidsgiver",
  NAV_VEILEDER = "NAV-veileder",
}
