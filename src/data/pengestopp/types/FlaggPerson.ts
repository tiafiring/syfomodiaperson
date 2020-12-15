export interface Arbeidsgiver {
  navn: string;
  orgnummer: string;
}

export interface Periode {
  tom: Date;
}

export interface Sykmelding {
  arbeidsgiver: string;
  orgnummer: string;
  pasient: {
    fnr: string;
  };
  mulighetForArbeid: {
    perioder: Periode[];
  };
  status: String;
}

export interface SykmeldtFnr {
  value: string;
}

export interface VirksomhetNr {
  value: string;
}

export interface VeilederIdent {
  value: string;
}

export interface EnhetNr {
  value: string;
}

export enum SykepengestoppArsakType {
  BESTRIDELSE_SYKMELDING = "BESTRIDELSE_SYKMELDING",
  MEDISINSK_VILKAR = "MEDISINSK_VILKAR",
  AKTIVITETSKRAV = "AKTIVITETSKRAV",
  TILBAKEDATERT_SYKMELDING = "TILBAKEDATERT_SYKMELDING",
  MANGLENDE_MEDVIRKING = "MANGLENDE_MEDVIRKING",
}

export interface SykepengestoppArsak {
  type: SykepengestoppArsakType;
}

export interface StoppAutomatikk {
  sykmeldtFnr: SykmeldtFnr;
  arsakList: SykepengestoppArsak[];
  virksomhetNr: VirksomhetNr[];
  enhetNr: EnhetNr;
}

export enum Status {
  NORMAL = "NORMAL",
  STOPP_AUTOMATIKK = "STOPP_AUTOMATIKK",
}

export interface StatusEndring {
  veilederIdent: VeilederIdent;
  sykmeldtFnr: SykmeldtFnr;
  arsakList: SykepengestoppArsak[];
  status: Status;
  virksomhetNr: VirksomhetNr;
  opprettet: string;
  enhetNr: EnhetNr;
}
