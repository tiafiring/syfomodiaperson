import React from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "nav-frontend-skjema";
import { VeilederinfoDTO } from "../../data/veilederinfo/types/VeilederinfoDTO";
import {
  erMotebehovBehandlet,
  harUbehandletMotebehov,
  hentSistBehandletMotebehov,
} from "../../utils/motebehovUtils";
import { toDatePrettyPrint } from "../../utils/datoUtils";
import { behandleMotebehov } from "../../data/motebehov/behandlemotebehov_actions";
import { MotebehovDTO } from "../../data/motebehov/types/motebehovTypes";

const behandleMotebehovKnappLabel = (
  erBehandlet: boolean,
  sistBehandletMotebehov?: MotebehovDTO
) => {
  return erBehandlet
    ? `Ferdigbehandlet av ${
        sistBehandletMotebehov?.behandletVeilederIdent
      } ${toDatePrettyPrint(sistBehandletMotebehov?.behandletTidspunkt)}`
    : "Marker som behandlet";
};

interface BehandleMotebehovKnappProps {
  fnr: string;
  motebehovListe: MotebehovDTO[];
  veilederinfo: VeilederinfoDTO;
}

const BehandleMotebehovKnapp = ({
  fnr,
  motebehovListe,
  veilederinfo,
}: BehandleMotebehovKnappProps) => {
  const sistBehandletMotebehov = hentSistBehandletMotebehov(motebehovListe);
  const erBehandlet = erMotebehovBehandlet(motebehovListe);

  const dispatch = useDispatch();

  return (
    <div className="panel behandleMotebehovKnapp">
      <div className="skjema__input">
        <Checkbox
          label={behandleMotebehovKnappLabel(
            erBehandlet,
            sistBehandletMotebehov
          )}
          onClick={() => {
            if (harUbehandletMotebehov(motebehovListe)) {
              dispatch(behandleMotebehov(fnr, veilederinfo.ident));
            }
          }}
          id="marker__utfoert"
          disabled={erBehandlet}
          checked={erBehandlet}
        />
      </div>
    </div>
  );
};

export default BehandleMotebehovKnapp;
