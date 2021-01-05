import React from "react";
import PropTypes from "prop-types";
import { Utvidbar } from "@navikt/digisyfo-npm";
import { sykepengesoknad as sykepengesoknadPt } from "../../../../propTypes";
import SykmeldingPerioder from "../../sykmeldinger/sykmelding/sykmeldingOpplysninger/SykmeldingPerioder";
import SykmeldingNokkelOpplysning from "../../sykmeldinger/sykmelding/sykmeldingOpplysninger/SykmeldingNokkelOpplysning";
import { toDatePrettyPrint } from "../../../../utils/datoUtils";

const texts = {
  tittel: "Opplysninger fra sykmeldingen",
  arbeidsgiver: "Arbeidsgiver",
  utdrag: "Dato sykmeldingen ble skrevet",
};

const SykmeldingUtdrag = ({ erApen, soknad }) => {
  const perioder = soknad.aktiviteter.map((aktivitet) => {
    return {
      fom: aktivitet.periode.fom,
      tom: aktivitet.periode.tom,
      grad: aktivitet.grad,
    };
  });

  return (
    <div className="blokk">
      <Utvidbar
        Overskrift="h2"
        erApen={erApen}
        visLukklenke={!erApen}
        tittel={texts.tittel}
        variant="lysebla"
        ikon="svg/plaster.svg"
        ikonHover="svg/plaster--hover.svg"
        ikonAltTekst="Plaster-ikon"
      >
        <div>
          <SykmeldingPerioder perioder={perioder} />
          <SykmeldingNokkelOpplysning tittel={texts.arbeidsgiver}>
            <p className="js-arbeidsgiver">{soknad.arbeidsgiver.navn}</p>
          </SykmeldingNokkelOpplysning>
          <SykmeldingNokkelOpplysning tittel={texts.utdrag}>
            <p className="js-utstedelsesdato">
              {toDatePrettyPrint(soknad.sykmeldingSkrevetDato)}
            </p>
          </SykmeldingNokkelOpplysning>
        </div>
      </Utvidbar>
    </div>
  );
};

SykmeldingUtdrag.propTypes = {
  erApen: PropTypes.bool,
  soknad: sykepengesoknadPt,
};

export default SykmeldingUtdrag;
