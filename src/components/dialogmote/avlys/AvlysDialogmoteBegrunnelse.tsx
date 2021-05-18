import { FlexColumn, FlexRow, PaddingSize } from "../../Layout";
import { Field } from "react-final-form";
import FritekstStor from "../../FritekstStor";
import { Knapp } from "nav-frontend-knapper";
import React, { ReactElement } from "react";
import AvlysDialogmoteSkjemaSeksjon from "./AvlysDialogmoteSkjemaSeksjon";

const texts = {
  preview: "Forhåndsvisning",
};

interface AvlysDialogmoteBegrunnelseProps {
  fieldName: string;
  label: string;
}

const AvlysDialogmoteBegrunnelse = ({
  fieldName,
  label,
}: AvlysDialogmoteBegrunnelseProps): ReactElement => (
  <AvlysDialogmoteSkjemaSeksjon>
    <FlexRow bottomPadding={PaddingSize.SM}>
      <FlexColumn flex={1}>
        <Field<string> name={fieldName}>
          {({ input, meta }) => (
            <FritekstStor
              label={label}
              maxLength={1000}
              feil={meta.touched && meta.error}
              {...input}
            />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
    <FlexRow>
      <Knapp htmlType="button">{texts.preview}</Knapp>
    </FlexRow>
  </AvlysDialogmoteSkjemaSeksjon>
);

export default AvlysDialogmoteBegrunnelse;
