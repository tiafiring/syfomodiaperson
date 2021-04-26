import React from "react";
import MaskedInput from "react-maskedinput";
import { SkjemaelementFeilmelding } from "nav-frontend-skjema";
import { FieldInputProps, FieldMetaState } from "react-final-form";

interface KlokkeslettFieldProps {
  meta: FieldMetaState<string>;
  id: string;
  input: FieldInputProps<string, HTMLInputElement>;
  type?: string;
  className?: string;
  placeholder?: string;
}

const KlokkeslettField = ({
  meta: { touched, error },
  input,
  id,
  type = "text",
  className,
  placeholder,
}: KlokkeslettFieldProps) => (
  <>
    <MaskedInput
      className={`skjemaelement__input ${className}${
        touched && error ? " skjemaelement__input--harFeil" : ""
      }`}
      mask="11.11"
      autoComplete="off"
      placeholder={placeholder}
      type={type}
      id={id}
      {...input}
    />
    <SkjemaelementFeilmelding>{touched && error}</SkjemaelementFeilmelding>
  </>
);

export default KlokkeslettField;
