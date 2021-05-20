import Panel from "nav-frontend-paneler";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useValgtPersonident } from "../../../hooks/useValgtBruker";
import { FlexRow, PaddingSize } from "../../Layout";
import { useDispatch } from "react-redux";
import { avlysMote } from "../../../data/dialogmote/dialogmote_actions";
import { useAppSelector } from "../../../hooks/hooks";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Form } from "react-final-form";
import DialogmoteInfo from "./DialogmoteInfo";
import { DialogmoteDTO } from "../../../data/dialogmote/dialogmoteTypes";
import AvlysDialogmoteBegrunnelse from "./AvlysDialogmoteBegrunnelse";
import { SkjemaFeiloppsummering } from "../../SkjemaFeiloppsummering";
import { useFeilUtbedret } from "../../../hooks/useFeilUtbedret";
import { validerBegrunnelser } from "../../../utils/valideringUtils";
import { TrackedHovedknapp } from "../../buttons/TrackedHovedknapp";
import { TrackedFlatknapp } from "../../buttons/TrackedFlatknapp";

const texts = {
  begrunnelseArbeidstakerLabel: "Begrunnelse til arbeidstakeren",
  begrunnelseArbeidsgiverLabel: "Begrunnelse til nærmeste leder",
  send: "Send avlysning",
  avbryt: "Avbryt",
  errorMsg:
    "Møtet kunne ikke avlyses på grunn av en midlertidig teknisk feil. Prøv igjen.",
};

interface AvlysDialogmoteSkjemaProps {
  dialogmote: DialogmoteDTO;
  pageTitle: string;
}

interface AvlysDialogmoteSkjemaValues {
  begrunnelseArbeidstaker: string;
  begrunnelseArbeidsgiver: string;
}

const AvlysPanel = styled(Panel)`
  padding: 1.75rem;
`;

const SendButton = styled(TrackedHovedknapp)`
  margin-right: 0.5rem;
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
          avlysning: [],
        },
        arbeidsgiver: {
          begrunnelse: values.begrunnelseArbeidsgiver,
          avlysning: [],
        },
      })
    );
  };

  return (
    <AvlysPanel>
      <Form initialValues={{}} onSubmit={submit} validate={validate}>
        {({ handleSubmit, submitFailed, errors }) => (
          <form onSubmit={handleSubmit}>
            <DialogmoteInfo dialogmote={dialogmote} />
            <AvlysDialogmoteBegrunnelse
              fieldName="begrunnelseArbeidstaker"
              label={texts.begrunnelseArbeidstakerLabel}
            />
            <AvlysDialogmoteBegrunnelse
              fieldName="begrunnelseArbeidsgiver"
              label={texts.begrunnelseArbeidsgiverLabel}
            />
            {avlysMoteFeilet && (
              <FlexRow bottomPadding={PaddingSize.MD}>
                <AlertStripeFeil>{texts.errorMsg}</AlertStripeFeil>
              </FlexRow>
            )}
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
