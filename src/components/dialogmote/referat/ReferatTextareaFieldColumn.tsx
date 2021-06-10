import styled from "styled-components";
import { FlexColumn } from "../../Layout";
import { Field } from "react-final-form";
import React, { ReactElement } from "react";
import Fritekst, { FritekstSize } from "../../Fritekst";

const TextAreaColumn = styled(FlexColumn)`
  margin-right: 2em;
`;

interface ReferatTextareaColumnProps {
  fieldName: string;
  size: FritekstSize;
  label: string;
  placeholder: string;
  maxLength: number;
}

export const ReferatTextareaFieldColumn = ({
  fieldName,
  size,
  ...rest
}: ReferatTextareaColumnProps): ReactElement => (
  <TextAreaColumn flex={1}>
    <Field<string> name={fieldName}>
      {({ input, meta }) => (
        <Fritekst
          data-cy={fieldName + "TextArea"}
          size={size}
          {...rest}
          feil={meta.submitFailed && meta.error}
          id={fieldName}
          {...input}
        />
      )}
    </Field>
  </TextAreaColumn>
);
