import {
  HENT_VEDTAK_FEILET,
  HENT_VEDTAK_HENTER,
  HENT_VEDTAK_HENTET,
} from "./vedtak_actions";
import { Reducer } from "redux";

export interface VedtakDTO {
  id: string;
  lest: boolean;
  lestDato: Date;
  vedtak: Vedtak;
  opprettet: Date;
  annullert: boolean;
}

export interface Vedtak {
  fom: Date;
  tom: Date;
  månedsinntekt?: number;
  sykepengegrunnlag?: number;
  forbrukteSykedager: number;
  gjenståendeSykedager: number;
  automatiskBehandling: boolean;
  organisasjonsnummer: string;
  utbetalinger: Utbetaling[];
}

export interface Utbetaling {
  mottaker: string;
  fagområde: string;
  totalbeløp: number;
  utbetalingslinjer: Utbetalingslinje[];
}

export interface Utbetalingslinje {
  fom: Date;
  tom: Date;
  dagsats: number;
  beløp: number;
  grad: number;
  sykedager: number;
}

export interface VedtakState {
  henter: boolean;
  hentingFeilet: boolean;
  hentet: boolean;
  hentingForsokt: boolean;

  data: VedtakDTO[] | null;
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
