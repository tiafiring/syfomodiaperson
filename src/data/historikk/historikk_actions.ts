import { Historikk } from "./types/Historikk";

export function hentHistorikkFeilet(kilde: string) {
  return {
    type: `HENT_HISTORIKK_FEILET_${kilde}`,
  };
}

export function henterHistorikk(kilde: string) {
  return {
    type: `HENTER_HISTORIKK_${kilde}`,
  };
}

export function hentHistorikk(fnr: string, kilde: string) {
  return {
    type: `HENT_HISTORIKK_${kilde}_FORESPURT`,
    fnr,
  };
}

export function historikkHentet(data: Historikk[], kilde: string) {
  return {
    type: `HISTORIKK_HENTET_${kilde}`,
    data,
  };
}
