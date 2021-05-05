import React from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "nav-frontend-skjema";
import { VeilederinfoDTO } from "../../data/veilederinfo/types/VeilederinfoDTO";
import {
  erMotebehovBehandlet,
  harUbehandletMotebehov,
  hentSistBehandletMotebehov,
  motebehovlisteMedKunJaSvar,
} from "../../utils/motebehovUtils";
import { toDatePrettyPrint } from "../../utils/datoUtils";
import { behandleMotebehov } from "../../data/motebehov/behandlemotebehov_actions";
import { MotebehovDTO } from "../../data/motebehov/types/motebehovTypes";
import { useFnrParam } from "../../hooks/useFnrParam";

const behandleMotebehovKnappLabel = (
  erBehandlet: boolean,
  sistBehandletMotebehov?: MotebehovDTO
) => {
  return erBehandlet
    ? `Ferdigbehandlet av ${
        sistBehandletMotebehov?.behandletVeilederIdent
      } ${toDatePrettyPrint(sistBehandletMotebehov?.behandletTidspunkt)}`
    : "Jeg har vurdert behovet. Oppgaven kan fjernes fra oversikten.";
};

interface BehandleMotebehovKnappProps {
  motebehovData: MotebehovDTO[];
  veilederinfo?: VeilederinfoDTO;
}

const BehandleMotebehovKnapp = ({
  motebehovData,
  veilederinfo,
}: BehandleMotebehovKnappProps) => {
  const motebehovListe = motebehovlisteMedKunJaSvar(motebehovData);
  const sistBehandletMotebehov = hentSistBehandletMotebehov(motebehovListe);
  const erBehandlet = erMotebehovBehandlet(motebehovListe);
  const fnr = useFnrParam();

  const dispatch = useDispatch();

  return veilederinfo && motebehovListe.length > 0 ? (
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
          defaultChecked={erBehandlet}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BehandleMotebehovKnapp;
