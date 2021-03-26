import { Reducer } from "redux";
import { SykmeldingOldFormat } from "./types/SykmeldingOldFormat";
import {
  newSMFormat2OldFormat,
  oldFormatSMForAG,
} from "../../utils/sykmeldinger/sykmeldingParser";
import {
  HENT_SYKMELDINGER_FEILET,
  HENTER_SYKMELDINGER,
  SYKMELDINGER_HENTET,
  SYKMELDINGER_SORTERT,
} from "./sykmeldinger_actions";
import { SykmeldingNewFormatDTO } from "./types/SykmeldingNewFormatDTO";

export interface SykmeldingerState {
  henter: boolean;
  hentingFeilet: boolean;
  hentet: boolean;
  data: SykmeldingOldFormat[];
  arbeidsgiverssykmeldinger: SykmeldingOldFormat[];
}

const initialState: SykmeldingerState = {
  henter: false,
  hentingFeilet: false,
  hentet: false,
  data: [],
  arbeidsgiverssykmeldinger: [],
};

const sykmeldinger: Reducer<SykmeldingerState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case HENT_SYKMELDINGER_FEILET: {
      return Object.assign({}, state, {
        data: [],
        arbeidsgiverssykmeldinger: [],
        henter: false,
        hentet: true,
        hentingFeilet: true,
      });
    }
    case HENTER_SYKMELDINGER: {
      return {
        data: [],
        arbeidsgiverssykmeldinger: [],
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case SYKMELDINGER_HENTET: {
      return {
        henter: false,
        hentingFeilet: false,
        hentet: true,
        data: action.data.map((sykmelding: SykmeldingNewFormatDTO) => {
          return newSMFormat2OldFormat(sykmelding, action.fnr);
        }),
        arbeidsgiverssykmeldinger: action.data.map(
          (sykmelding: SykmeldingNewFormatDTO) => {
            return oldFormatSMForAG(sykmelding, action.fnr);
          }
        ),
      };
    }
    case SYKMELDINGER_SORTERT: {
      const sortering = {} as any;
      sortering[action.status] = action.kriterium;
      return {
        ...state,
        sortering,
      };
    }
    default: {
      return state;
    }
  }
};

export default sykmeldinger;
