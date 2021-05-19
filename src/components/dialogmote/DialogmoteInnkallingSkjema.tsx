import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import DialogmoteInnkallingVelgArbeidsgiver from "./DialogmoteInnkallingVelgArbeidsgiver";
import DialogmoteInnkallingTidOgSted from "./DialogmoteInnkallingTidOgSted";
import DialogmoteInnkallingTekster from "./DialogmoteInnkallingTekster";
import { Flatknapp, Hovedknapp } from "nav-frontend-knapper";
import { Form } from "react-final-form";
import {
  validerArbeidsgiver,
  validerSted,
  validerTidspunkt,
} from "../../utils/valideringUtils";
import { opprettInnkalling } from "../../data/dialogmote/dialogmote_actions";
import { useDispatch } from "react-redux";
import { DialogmoteInnkallingDTO } from "../../data/dialogmote/dialogmoteTypes";
import { genererDato } from "../mote/utils";
import { Link } from "react-router-dom";
import { useNavEnhet } from "../../hooks/useNavEnhet";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { useAppSelector } from "../../hooks/hooks";
import { useFnrParam } from "../../hooks/useFnrParam";
import { FlexRow, PaddingSize } from "../Layout";

interface DialogmoteInnkallingSkjemaValues {
  arbeidsgiver: string;
  tidspunkt: {
    klokkeslett: string;
    dato: string;
  };
  sted: string;
  videoLink?: string;
  fritekstArbeidsgiver?: string;
  fritekstArbeidstaker?: string;
}

interface DialogmoteInnkallingSkjemaFeil {
  arbeidsgiver?: string;
  sted?: string;
  tidspunkt: {
    klokkeslett?: string;
    dato?: string;
  };
}

const texts = {
  send: "Send innkallingene",
  cancel: "Avbryt",
  errorMsg:
    "Innkallingene kunne ikke sendes på grunn av en midlertidig teknisk feil. Prøv igjen.",
};

const validate = (
  values: Partial<DialogmoteInnkallingSkjemaValues>
): DialogmoteInnkallingSkjemaFeil => {
  const feilmeldinger: DialogmoteInnkallingSkjemaFeil = { tidspunkt: {} };
  feilmeldinger.sted = validerSted(values.sted);
  feilmeldinger.tidspunkt = validerTidspunkt(values.tidspunkt);
  feilmeldinger.arbeidsgiver = validerArbeidsgiver(values.arbeidsgiver);

  return feilmeldinger;
};

const toInnkalling = (
  values: DialogmoteInnkallingSkjemaValues,
  fnr: string,
  navEnhet: string
): DialogmoteInnkallingDTO => ({
  tildeltEnhet: navEnhet,
  arbeidsgiver: {
    virksomhetsnummer: values.arbeidsgiver,
    fritekstInnkalling: values.fritekstArbeidsgiver,
    innkalling: [], // TODO: Implementeres ifm forhåndsvisning av innkalling
  },
  arbeidstaker: {
    personIdent: fnr,
    fritekstInnkalling: values.fritekstArbeidstaker,
    innkalling: [], // TODO: Implementeres ifm forhåndsvisning av innkalling
  },
  tidSted: {
    sted: values.sted,
    videoLink: values.videoLink,
    tid: genererDato(values.tidspunkt.dato, values.tidspunkt.klokkeslett),
  },
});

const DialogmoteInnkallingSkjema = (): ReactElement => {
  const initialValues: Partial<DialogmoteInnkallingSkjemaValues> = {};
  const dispatch = useDispatch();
  const fnr = useFnrParam();
  const navEnhet = useNavEnhet();
  const { senderInnkalling, sendInnkallingFeilet } = useAppSelector(
    (state) => state.dialogmote
  );

  const submit = (values: DialogmoteInnkallingSkjemaValues) => {
    const dialogmoteInnkalling = toInnkalling(values, fnr, navEnhet);
    dispatch(opprettInnkalling(fnr, dialogmoteInnkalling));
  };

  return (
    <Panel>
      <Form initialValues={initialValues} onSubmit={submit} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DialogmoteInnkallingVelgArbeidsgiver />
            <DialogmoteInnkallingTidOgSted />
            <DialogmoteInnkallingTekster />
            {sendInnkallingFeilet && (
              <FlexRow bottomPadding={PaddingSize.MD}>
                <AlertStripeFeil>{texts.errorMsg}</AlertStripeFeil>
              </FlexRow>
            )}
            <FlexRow>
              <Hovedknapp
                spinner={senderInnkalling}
                autoDisableVedSpinner
                htmlType="submit"
              >
                {texts.send}
              </Hovedknapp>
              <Link to={`/sykefravaer/${fnr}/moteoversikt`}>
                <Flatknapp htmlType="button">{texts.cancel}</Flatknapp>
              </Link>
            </FlexRow>
          </form>
        )}
      </Form>
    </Panel>
  );
};

export default DialogmoteInnkallingSkjema;
