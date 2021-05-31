import { FlexColumn, FlexRow, PaddingSize } from "../../Layout";
import { Field } from "react-final-form";
import FritekstStor from "../../FritekstStor";
import React, { ReactElement } from "react";
import AvlysDialogmoteSkjemaSeksjon from "./AvlysDialogmoteSkjemaSeksjon";
import { TrackedKnapp } from "../../buttons/TrackedKnapp";

const texts = {
  preview: "Forhåndsvisning",
};

interface AvlysDialogmoteBegrunnelseProps {
  fieldName: string;
  label: string;
  handlePreviewClick: () => void;
}

const AvlysDialogmoteBegrunnelse = ({
  fieldName,
  label,
  handlePreviewClick,
}: AvlysDialogmoteBegrunnelseProps): ReactElement => {
  return (
    <AvlysDialogmoteSkjemaSeksjon>
      <FlexRow bottomPadding={PaddingSize.SM}>
        <FlexColumn flex={1}>
          <Field<string> name={fieldName}>
            {({ input, meta }) => (
              <FritekstStor
                label={label}
                maxLength={1000}
                feil={meta.submitFailed && meta.error}
                id={fieldName}
                {...input}
              />
            )}
          </Field>
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <TrackedKnapp
          htmlType="button"
          context={label}
          onClick={handlePreviewClick}
        >
          {texts.preview}
        </TrackedKnapp>
      </FlexRow>
    </AvlysDialogmoteSkjemaSeksjon>
  );
};

export default AvlysDialogmoteBegrunnelse;
