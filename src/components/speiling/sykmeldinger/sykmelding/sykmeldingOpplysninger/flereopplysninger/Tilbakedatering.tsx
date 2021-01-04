import React from "react";
import { SykmeldingOldFormat } from "../../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { tilLesbarDatoMedArstall } from "../../../../../../utils/datoUtils";
import { getSykmeldingOpplysning } from "../../../../../../utils/sykmeldingUtils";

const texts = {
  begrunnelse: "Pasienten har ikke kunne ivareta egne interesser. Begrunn",
  dokumenterbarPasientkontakt:
    "Oppgi dato for dokumenterbar kontakt med pasienten",
  title: "Tilbakedatering",
};

interface TilbakedateringProps {
  sykmelding: SykmeldingOldFormat;
}

const Tilbakedatering = (tilbakedateringProps: TilbakedateringProps) => {
  const { sykmelding } = tilbakedateringProps;
  const visSeksjon =
    sykmelding.tilbakedatering.dokumenterbarPasientkontakt ||
    sykmelding.tilbakedatering.tilbakedatertBegrunnelse;
  if (!visSeksjon) {
    return <span />;
  }
  return (
    <div className="sykmeldingSeksjon">
      <h4 className="sykmeldingSeksjon__tittel">{texts.title}</h4>
      {getSykmeldingOpplysning(
        sykmelding.tilbakedatering,
        "dokumenterbarPasientkontakt",
        texts.dokumenterbarPasientkontakt,
        tilLesbarDatoMedArstall(
          sykmelding.tilbakedatering.dokumenterbarPasientkontakt
        )
      )}
      {getSykmeldingOpplysning(
        sykmelding.tilbakedatering,
        "tilbakedatertBegrunnelse",
        texts.begrunnelse
      )}
    </div>
  );
};

export default Tilbakedatering;
