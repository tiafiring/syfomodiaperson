export enum EventType {
  NY_AKTIV_BRUKER = "NY_AKTIV_BRUKER",
  NY_AKTIV_ENHET = "NY_AKTIV_ENHET",
}

export interface RSContext {
  aktivBruker: string;
  aktivEnhet: string;
}

export interface RSNyContext {
  verdi: string;
  eventType: string;
}
