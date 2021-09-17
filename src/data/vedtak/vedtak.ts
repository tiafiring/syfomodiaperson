import {
  HENT_VEDTAK_FEILET,
  HENT_VEDTAK_HENTER,
  HENT_VEDTAK_HENTET,
} from "./vedtak_actions";
import { Reducer } from "redux";

export interface VedtakDTO {
  id: string;
  lest: boolean;
  lestDato?: Date;
  vedtak: Vedtak;
  opprettet: Date;
  opprettetTimestamp: string;
  annullert: boolean;
  revurdert: boolean;
  dager: Dag[];
  dagligUtbetalingsbelop: number;
  antallDagerMedUtbetaling: number;
  sykepengebelop: number;
}

export interface Vedtak {
  organisasjonsnummer?: string;
  fom: Date;
  tom: Date;
  dokumenter: Dokument[];
  inntekt?: number;
  sykepengegrunnlag?: number;
  utbetaling: UtbetalingUtbetalt;
}

export interface UtbetalingUtbetalt {
  organisasjonsnummer?: string;
  utbetalingId?: string;
  forbrukteSykedager: number;
  gjenståendeSykedager: number;
  automatiskBehandling: boolean;
  arbeidsgiverOppdrag: Oppdrag;
  utbetalingsdager: Utbetalingdag[];
  utbetalingType: string;
}

export interface Oppdrag {
  mottaker: string;
  nettoBeløp: number;
  utbetalingslinjer: Utbetalingslinje[];
}

export interface Utbetalingslinje {
  fom: Date;
  tom: Date;
  dagsats: number;
  dagsatsTransformasjonHjelper: number;
  totalBeløp: number;
  grad: number;
  stønadsdager: number;
}

export interface Utbetalingdag {
  dato: Date;
  type: string;
  begrunnelse: string[];
}

export interface Dag {
  dato: Date;
  belop: number;
  grad: number;
  dagtype: string;
  begrunnelser: string[];
}

export interface VedtakState {
  henter: boolean;
  hentingFeilet: boolean;
  hentet: boolean;
  hentingForsokt: boolean;

  data: VedtakDTO[] | null;
}

export interface Dokument {
  type: Type;
}

enum Type {
  Sykmelding,
  Søknad,
  Inntektsmelding,
}

export const initialState: VedtakState = {
  henter: false,
  hentingFeilet: false,
  hentet: false,
  hentingForsokt: false,
  data: null,
};

const vedtak: Reducer<VedtakState> = (state = initialState, action) => {
  switch (action.type) {
    case HENT_VEDTAK_HENTER: {
      return {
        ...state,
        henter: true,
        hentingFeilet: false,
        hentet: false,
      };
    }
    case HENT_VEDTAK_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        hentingForsokt: true,
        data: action.data.reverse(),
      };
    }
    case HENT_VEDTAK_FEILET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
        hentingForsokt: true,
      };
    }
    default:
      return state;
  }
};

export default vedtak;
