import React, { useState } from "react";
import { useFormState } from "react-final-form";
import { FritekstSeksjon } from "../innkalling/DialogmoteInnkallingTekster";
import { Forhandsvisning } from "../Forhandsvisning";
import { EndreTidStedSkjemaValues } from "./EndreDialogmoteSkjema";
import { useForhandsvisTidSted } from "../../../hooks/dialogmote/useForhandsvisTidSted";

const texts = {
  send: "Lagre endringer",
  avbryt: "Avbryt",
  begrunnelseArbeidsgiver: "Begrunnelse til arbeidsgiveren",
  begrunnelseArbeidstaker: "Begrunnelse til nærmeste leder",
  forhandsvisningTitle: "Endret dialogmøte",
  forhandsvisningArbeidstakerSubtitle: "(brev til arbeidstakeren)",
  forhandsvisningArbeidstakerContentLabel:
    "Forhåndsvis endring av dialogmøte arbeidstaker",
  forhandsvisningArbeidsgiverSubtitle: "(brev til nærmeste leder)",
  forhandsvisningArbeidsgiverContentLabel:
    "Forhåndsvis endring ab dialogmøte arbeidsgiver",
};

const EndreDialogmoteTekster = () => {
  const { values } = useFormState<EndreTidStedSkjemaValues>();
  const [
    displayEndringArbeidstakerPreview,
    setDisplayEndringArbeidstakerPreview,
  ] = useState(false);
  const [
    displayEndringArbeidsgiverPreview,
    setDisplayEndringArbeidsgiverPreview,
  ] = useState(false);
  const { arbeidstakerTidSted, arbeidsgiverTidSted } = useForhandsvisTidSted();

  return (
    <>
      <FritekstSeksjon
        fieldName="begrunnelseArbeidstaker"
        label={texts.begrunnelseArbeidstaker}
        handlePreviewClick={() => setDisplayEndringArbeidstakerPreview(true)}
      />
      <Forhandsvisning
        title={texts.forhandsvisningTitle}
        subtitle={texts.forhandsvisningArbeidstakerSubtitle}
        contentLabel={texts.forhandsvisningArbeidstakerContentLabel}
        isOpen={displayEndringArbeidstakerPreview}
        handleClose={() => setDisplayEndringArbeidstakerPreview(false)}
        documentComponents={() => arbeidstakerTidSted(values)}
      />
      <FritekstSeksjon
        fieldName="begrunnelseArbeidsgiver"
        label={texts.begrunnelseArbeidsgiver}
        handlePreviewClick={() => setDisplayEndringArbeidsgiverPreview(true)}
      />
      <Forhandsvisning
        title={texts.forhandsvisningTitle}
        subtitle={texts.forhandsvisningArbeidsgiverSubtitle}
        contentLabel={texts.forhandsvisningArbeidsgiverContentLabel}
        isOpen={displayEndringArbeidsgiverPreview}
        handleClose={() => setDisplayEndringArbeidsgiverPreview(false)}
        documentComponents={() => arbeidsgiverTidSted(values)}
      />
    </>
  );
};

export default EndreDialogmoteTekster;
