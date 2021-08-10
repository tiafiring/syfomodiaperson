import React, { ReactElement } from "react";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import { tilLesbarDatoMedArstall } from "../../../../utils/datoUtils";
import SykmeldingPerioder from "../../sykmeldinger/sykmelding/sykmeldingOpplysninger/SykmeldingPerioder";
import SykmeldingNokkelOpplysning from "../../sykmeldinger/sykmelding/sykmeldingOpplysninger/SykmeldingNokkelOpplysning";
import Utvidbar from "../../../Utvidbar";
import {
  PlasterHoverImage,
  PlasterImage,
} from "../../../../../img/ImageComponents";

const texts = {
  tittel: "Opplysninger fra sykmeldingen",
  arbeidsgiver: "Arbeidsgiver",
  utdrag: "Dato sykmeldingen ble skrevet",
};

interface SykmeldingUtdragProps {
  erApen?: boolean;
  sykmelding: SykmeldingOldFormat;
}

const SykmeldingUtdrag = ({
  erApen,
  sykmelding,
}: SykmeldingUtdragProps): ReactElement => {
  return (
    <div className="blokk">
      <Utvidbar
        Overskrift="h2"
        erApen={erApen}
        visLukklenke={!erApen}
        tittel={texts.tittel}
        variant="lysebla"
        ikon={PlasterImage}
        ikonHover={PlasterHoverImage}
        ikonAltTekst="Plaster-ikon"
      >
        <div>
          <SykmeldingPerioder
            perioder={sykmelding.mulighetForArbeid.perioder}
          />
          <SykmeldingNokkelOpplysning tittel={texts.arbeidsgiver}>
            <p className="js-arbeidsgiver">
              {sykmelding.mottakendeArbeidsgiver?.navn}
            </p>
          </SykmeldingNokkelOpplysning>
          <SykmeldingNokkelOpplysning tittel={texts.utdrag}>
            <p className="js-utstedelsesdato">
              {tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato)}
            </p>
          </SykmeldingNokkelOpplysning>
        </div>
      </Utvidbar>
    </div>
  );
};

export default SykmeldingUtdrag;
