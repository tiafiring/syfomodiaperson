import React, { ReactElement } from "react";
import OppsummeringPerioder from "./OppsummeringPerioder";
import OppsummeringDato from "./OppsummeringDato";
import OppsummeringCheckboxgruppe from "./OppsummeringCheckboxgruppe";
import OppsummeringTall from "./OppsummeringTall";
import OppsummeringCheckbox from "./OppsummeringCheckbox";
import OppsummeringJaEllerNei from "./OppsummeringJaEllerNei";
import OppsummeringFritekst from "./OppsummeringFritekst";
import OppsummeringUndertekst from "./OppsummeringUndertekst";
import OppsummeringRadioGruppe from "./OppsummeringRadioGruppe";
import OppsummeringGruppeRadioUkekalender from "./OppsummeringGruppeRadioUkekalender";
import {
  SporsmalDTO,
  SvarTypeDTO,
} from "../../../../data/sykepengesoknad/types/SykepengesoknadDTO";

export interface OppsummeringSporsmalProps extends SporsmalDTO {
  overskriftsnivaa?: number;
}

const OppsummeringSporsmal = (
  props: OppsummeringSporsmalProps
): ReactElement | null => {
  switch (props.svartype) {
    case SvarTypeDTO.CHECKBOX_PANEL:
    case SvarTypeDTO.CHECKBOX: {
      return <OppsummeringCheckbox {...props} />;
    }
    case SvarTypeDTO.JA_NEI: {
      return <OppsummeringJaEllerNei {...props} />;
    }
    case SvarTypeDTO.DATO: {
      return <OppsummeringDato {...props} />;
    }
    case SvarTypeDTO.PERIODER: {
      return <OppsummeringPerioder {...props} />;
    }
    case SvarTypeDTO.LAND:
    case SvarTypeDTO.FRITEKST: {
      return <OppsummeringFritekst {...props} />;
    }
    case SvarTypeDTO.IKKE_RELEVANT: {
      return <OppsummeringUndertekst {...props} />;
    }
    case SvarTypeDTO.INFO_BEHANDLINGSDAGER: {
      return <OppsummeringUndertekst {...props} />;
    }
    case SvarTypeDTO.CHECKBOX_GRUPPE: {
      return <OppsummeringCheckboxgruppe {...props} />;
    }
    case SvarTypeDTO.TALL:
    case SvarTypeDTO.PROSENT:
    case SvarTypeDTO.TIMER: {
      return <OppsummeringTall {...props} />;
    }
    case SvarTypeDTO.RADIO_GRUPPE_TIMER_PROSENT:
    case SvarTypeDTO.RADIO_GRUPPE: {
      return <OppsummeringRadioGruppe {...props} />;
    }
    case SvarTypeDTO.RADIO_GRUPPE_UKEKALENDER:
      return <OppsummeringGruppeRadioUkekalender {...props} />;
    default: {
      return null;
    }
  }
};

export default OppsummeringSporsmal;
