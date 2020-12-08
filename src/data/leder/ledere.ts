import { Reducer } from "redux";
import {
  HENTER_LEDERE,
  LEDERE_HENTET,
  HENT_LEDERE_FEILET,
} from "./ledere_actions";
import {
  currentLedere,
  formerLedere,
  mapTomDateToEarlierLedere,
} from "../../utils/ledereUtils";

export interface Leder {
  aktoerId: string;
  epost?: string;
  tlf?: string;
  navn: string;
  aktiv: boolean;
  orgnummer: string;
  organisasjonsnavn: string;
  fomDato: Date;
  aktivTom?: Date;
  arbeidsgiverForskuttererLoenn?: boolean;
}

export interface LedereState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data: Leder[];
  allLedere: Leder[];
  formerLedere: Leder[];
}

export const initialState: LedereState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: [],
  allLedere: [],
  formerLedere: [],
};

const ledere: Reducer<LedereState> = (state = initialState, action) => {
  switch (action.type) {
    case LEDERE_HENTET: {
      const ledereWithTomDate = mapTomDateToEarlierLedere(action.data);
      return {
        data: currentLedere(ledereWithTomDate),
        formerLedere: formerLedere(ledereWithTomDate),
        allLedere: ledereWithTomDate,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      };
    }
    case HENTER_LEDERE: {
      return {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: [],
        formerLedere: [],
        allLedere: [],
      };
    }
    case HENT_LEDERE_FEILET: {
      return {
        henter: false,
        hentet: false,
        hentingFeilet: true,
        data: [],
        formerLedere: [],
        allLedere: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default ledere;
