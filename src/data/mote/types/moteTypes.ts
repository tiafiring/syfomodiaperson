export interface MoteAlternativDTO {
  id: number;
  tid: Date;
  created: Date;
  sted: string;
  valgt: boolean;
}

export interface MoteSvarDTO {
  id: number;
  tid: Date;
  created: Date;
  sted: string;
  valgt: boolean;
}

export interface MoteDeltakerDTO {
  navn: string;
  orgnummer: string;
  type: MoteDeltakerType;
  svar: MoteSvarDTO[];
  svartidspunkt: Date;
}

export interface MoteDTO {
  moteUuid: string;
  status: string;
  fnr: string;
  opprettetTidspunkt: Date;
  bekreftetTidspunkt: Date;
  deltakere: MoteDeltakerDTO[];
  alternativer: MoteAlternativDTO[];
}

enum MoteDeltakerType {
  BRUKER = "Bruker",
  ARBEIDSGIVER = "arbeidsgiver",
  NAV_VEILEDER = "NAV-veileder",
}
