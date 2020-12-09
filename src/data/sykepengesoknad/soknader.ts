import { Reducer } from "redux";
import {
  SporsmalDTO,
  SvarTypeDTO,
  SykepengesoknadDTO,
} from "./types/SykepengesoknadDTO";
import {
  HENT_SOKNADER_FEILET,
  HENTER_SOKNADER,
  SOKNADER_HENTET,
} from "./soknader_actions";

const getMinMax = (sporsmal: SporsmalDTO) => {
  switch (sporsmal.svartype) {
    case SvarTypeDTO.PERIODER:
    case SvarTypeDTO.DATO: {
      return {
        min: sporsmal.min ? new Date(sporsmal.min) : sporsmal.min,
        max: sporsmal.max ? new Date(sporsmal.max) : sporsmal.max,
      };
    }
    case SvarTypeDTO.TALL:
    case SvarTypeDTO.TIMER:
    case SvarTypeDTO.PROSENT: {
      return {
        min: parseInt(sporsmal.min, 10),
        max: parseInt(sporsmal.max, 10),
      };
    }
    default: {
      return {};
    }
  }
};

const parseSporsmal = (sporsmal: SporsmalDTO): any => {
  const minMax = getMinMax(sporsmal);
  return {
    ...sporsmal,
    ...minMax,
    undersporsmal: [...sporsmal.undersporsmal].map(parseSporsmal),
  };
};

export const parseSoknad = (soknad: SykepengesoknadDTO) => {
  return {
    ...soknad,
    fom: new Date(soknad.fom),
    tom: new Date(soknad.tom),
    opprettetDato: new Date(soknad.opprettetDato),
    innsendtDato: soknad.innsendtDato ? new Date(soknad.innsendtDato) : null,
    sendtTilNAVDato: soknad.sendtTilNAVDato
      ? new Date(soknad.sendtTilNAVDato)
      : null,
    sendtTilArbeidsgiverDato: soknad.sendtTilArbeidsgiverDato
      ? new Date(soknad.sendtTilArbeidsgiverDato)
      : null,
    sporsmal: [...soknad.sporsmal].map(parseSporsmal),
  };
};

export interface SykepengesoknaderState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data: SykepengesoknadDTO[];
}

export const initialState: SykepengesoknaderState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: [],
};

const soknader: Reducer<SykepengesoknaderState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case SOKNADER_HENTET: {
      return {
        data: action.soknader.map(parseSoknad),
        hentet: true,
        henter: false,
        hentingFeilet: false,
      };
    }
    case HENT_SOKNADER_FEILET: {
      return {
        data: [],
        hentet: true,
        henter: false,
        hentingFeilet: true,
      };
    }
    case HENTER_SOKNADER: {
      return {
        data: [],
        hentet: false,
        henter: true,
        hentingFeilet: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default soknader;
