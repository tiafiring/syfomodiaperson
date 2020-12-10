export interface TidOgStedDTO {
  tid: Date;
  created: Date;
  sted: string;
  valgt: boolean;
}

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
  opprettetAv: string;
  aktorId: string;
  status: string;
  fnr?: string;
  opprettetTidspunkt: Date;
  bekreftetTidspunkt?: Date;
  navEnhet: string;
  eier: string;
  deltakere: MoteDeltakerDTO[];
  bekreftetAlternativ?: TidOgStedDTO;
  alternativer: MoteAlternativDTO[];
  sistEndret: Date;
  trengerBehandling: boolean;
}

enum MoteDeltakerType {
  BRUKER = "Bruker",
  ARBEIDSGIVER = "arbeidsgiver",
  NAV_VEILEDER = "NAV-veileder",
}
