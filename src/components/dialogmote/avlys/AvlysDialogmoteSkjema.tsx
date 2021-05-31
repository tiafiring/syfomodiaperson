import Panel from "nav-frontend-paneler";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useValgtPersonident } from "../../../hooks/useValgtBruker";
import { FlexRow, PaddingSize } from "../../Layout";
import { useDispatch } from "react-redux";
import { avlysMote } from "../../../data/dialogmote/dialogmote_actions";
import { useAppSelector } from "../../../hooks/hooks";
import {
  AlertStripeAdvarsel,
  AlertStripeFeil,
} from "nav-frontend-alertstriper";
import { Form } from "react-final-form";
import DialogmoteInfo from "./DialogmoteInfo";
import { DialogmoteDTO } from "../../../data/dialogmote/dialogmoteTypes";
import AvlysDialogmoteBegrunnelse from "./AvlysDialogmoteBegrunnelse";
import { SkjemaFeiloppsummering } from "../../SkjemaFeiloppsummering";
import { useFeilUtbedret } from "../../../hooks/useFeilUtbedret";
import { validerBegrunnelser } from "../../../utils/valideringUtils";
import { TrackedHovedknapp } from "../../buttons/TrackedHovedknapp";
import { TrackedFlatknapp } from "../../buttons/TrackedFlatknapp";
import { useForhandsvisAvlysning } from "../../../hooks/dialogmote/useForhandsvisAvlysning";
import { Forhandsvisning } from "../Forhandsvisning";

export const texts = {
  begrunnelseArbeidstakerLabel: "Begrunnelse til arbeidstakeren",
  begrunnelseArbeidsgiverLabel: "Begrunnelse til nærmeste leder",
  send: "Send avlysning",
  avbryt: "Avbryt",
  errorMsg:
    "Møtet kunne ikke avlyses på grunn av en midlertidig teknisk feil. Prøv igjen.",
  alert:
    "Hvis årsaken til avlysning er at arbeidstakeren ikke møtte opp, bør du vurdere om sykepengene skal stanses.",
  forhandsvisningTitle: "Avlysning av dialogmøte",
  forhandsvisningArbeidstakerSubtitle: "(brev til arbeidstakeren)",
  forhandsvisningArbeidsgiverSubtitle: "(brev til nærmeste leder)",
  forhandsvisningArbeidstakerContentlabel:
    "Forhåndsvis avlysning av dialogmøte arbeidstaker",
  forhandsvisningArbeidsgiverContentlabel:
    "Forhåndsvis avlysning av dialogmøte arbeidsgiver",
};

interface AvlysDialogmoteSkjemaProps {
  dialogmote: DialogmoteDTO;
  pageTitle: string;
}

export interface AvlysDialogmoteSkjemaValues {
  begrunnelseArbeidstaker: string;
  begrunnelseArbeidsgiver: string;
}

const AvlysPanel = styled(Panel)`
  padding: 1.75rem;
`;

const SendButton = styled(TrackedHovedknapp)`
  margin-right: 0.5rem;
`;

const AvlysningAlertStripe = styled(AlertStripeAdvarsel)`
  margin-bottom: 4em;
  .alertstripe__tekst {
    max-width: 100%;
  }
`;

const AvlysDialogmoteSkjema = ({
  dialogmote,
  pageTitle,
}: AvlysDialogmoteSkjemaProps): ReactElement => {
  const dispatch = useDispatch();
  const fnr = useValgtPersonident();
  const { avlyserMote, avlysMoteFeilet } = useAppSelector(
    (state) => state.dialogmote
  );
  const {
    feilUtbedret,
    resetFeilUtbedret,
    updateFeilUtbedret,
  } = useFeilUtbedret();
  const [
    visAvlysningArbeidstakerPreview,
    setVisAvlysningArbeidstakerPreview,
  ] = useState(false);
  const [
    visAvlysningArbeidsgiverPreview,
    setVisAvlysningArbeidsgiverPreview,
  ] = useState(false);
  const {
    avlysningArbeidstaker,
    avlysningArbeidsgiver,
  } = useForhandsvisAvlysning(dialogmote);

  const validate = (
    values: Partial<AvlysDialogmoteSkjemaValues>
  ): Partial<AvlysDialogmoteSkjemaValues> => {
    const feil = validerBegrunnelser({
      ...values,
    });
    updateFeilUtbedret(feil);

    return feil;
  };

  const submit = (values: AvlysDialogmoteSkjemaValues) => {
    dispatch(
      avlysMote(dialogmote.uuid, fnr, {
        arbeidstaker: {
          begrunnelse: values.begrunnelseArbeidstaker,
          avlysning: avlysningArbeidstaker(values),
        },
        arbeidsgiver: {
          begrunnelse: values.begrunnelseArbeidsgiver,
          avlysning: avlysningArbeidsgiver(values),
        },
      })
    );
  };

  return (
    <AvlysPanel>
      <Form initialValues={{}} onSubmit={submit} validate={validate}>
        {({ handleSubmit, submitFailed, errors, values }) => (
          <form onSubmit={handleSubmit}>
            <DialogmoteInfo dialogmote={dialogmote} />
            <AvlysDialogmoteBegrunnelse
              fieldName="begrunnelseArbeidstaker"
              label={texts.begrunnelseArbeidstakerLabel}
              handlePreviewClick={() =>
                setVisAvlysningArbeidstakerPreview(true)
              }
            />
            <Forhandsvisning
              title={texts.forhandsvisningTitle}
              subtitle={texts.forhandsvisningArbeidstakerSubtitle}
              contentLabel={texts.forhandsvisningArbeidstakerContentlabel}
              isOpen={visAvlysningArbeidstakerPreview}
              handleClose={() => setVisAvlysningArbeidstakerPreview(false)}
              documentComponents={() => avlysningArbeidstaker(values)}
            />
            <AvlysDialogmoteBegrunnelse
              fieldName="begrunnelseArbeidsgiver"
              label={texts.begrunnelseArbeidsgiverLabel}
              handlePreviewClick={() =>
                setVisAvlysningArbeidsgiverPreview(true)
              }
            />
            <Forhandsvisning
              title={texts.forhandsvisningTitle}
              subtitle={texts.forhandsvisningArbeidsgiverSubtitle}
              contentLabel={texts.forhandsvisningArbeidsgiverContentlabel}
              isOpen={visAvlysningArbeidsgiverPreview}
              handleClose={() => setVisAvlysningArbeidsgiverPreview(false)}
              documentComponents={() => avlysningArbeidsgiver(values)}
            />
            {avlysMoteFeilet && (
              <FlexRow bottomPadding={PaddingSize.MD}>
                <AlertStripeFeil>{texts.errorMsg}</AlertStripeFeil>
              </FlexRow>
            )}
            <AvlysningAlertStripe>{texts.alert}</AvlysningAlertStripe>
            {submitFailed && !feilUtbedret && (
              <SkjemaFeiloppsummering errors={errors} />
            )}
            <FlexRow>
              <SendButton
                context={pageTitle}
                onClick={resetFeilUtbedret}
                htmlType="submit"
                spinner={avlyserMote}
                autoDisableVedSpinner
              >
                {texts.send}
              </SendButton>
              <Link to={`/sykefravaer/moteoversikt`}>
                <TrackedFlatknapp context={pageTitle} htmlType="button">
                  {texts.avbryt}
                </TrackedFlatknapp>
              </Link>
            </FlexRow>
          </form>
        )}
      </Form>
    </AvlysPanel>
  );
};

export default AvlysDialogmoteSkjema;
