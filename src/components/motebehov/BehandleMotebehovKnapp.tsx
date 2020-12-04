import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "nav-frontend-skjema";
import {
  erMotebehovBehandlet,
  harUbehandletMotebehov,
  hentSistBehandletMotebehov,
} from "../../utils/motebehovUtils";
import { toDatePrettyPrint } from "../../utils/datoUtils";

const behandleMotebehov = (
  actions: any,
  fnr: string,
  veilederinfo: any,
  motebehovListe: any[]
) => {
  if (harUbehandletMotebehov(motebehovListe)) {
    actions.behandleMotebehov(fnr, veilederinfo.ident);
  }
};

const behandleMotebehovKnappLabel = (
  erBehandlet: boolean,
  sistBehandletMotebehov: any
) => {
  return erBehandlet
    ? `Ferdigbehandlet av ${
        sistBehandletMotebehov.behandletVeilederIdent
      } ${toDatePrettyPrint(sistBehandletMotebehov.behandletTidspunkt)}`
    : "Marker som behandlet";
};

interface BehandleMotebehovKnappProps {
  actions: any;
  fnr: string;
  motebehovListe: any[];
  veilederinfo: any;
}

const BehandleMotebehovKnapp = (
  behandleMotebehovKnappProps: BehandleMotebehovKnappProps
) => {
  const {
    actions,
    fnr,
    motebehovListe,
    veilederinfo,
  } = behandleMotebehovKnappProps;
  const sistBehandletMotebehov = hentSistBehandletMotebehov(motebehovListe);
  const erBehandlet = erMotebehovBehandlet(motebehovListe);

  return (
    <div className="panel behandleMotebehovKnapp">
      <div className="skjema__input">
        <Checkbox
          label={behandleMotebehovKnappLabel(
            erBehandlet,
            sistBehandletMotebehov
          )}
          onClick={() => {
            behandleMotebehov(actions, fnr, veilederinfo, motebehovListe);
          }}
          id="marker__utfoert"
          disabled={erBehandlet}
          checked={erBehandlet}
        />
      </div>
    </div>
  );
};

BehandleMotebehovKnapp.propTypes = {
  actions: PropTypes.object,
  fnr: PropTypes.string,
  motebehovListe: PropTypes.arrayOf(PropTypes.object),
  veilederinfo: PropTypes.object,
};

export default BehandleMotebehovKnapp;
