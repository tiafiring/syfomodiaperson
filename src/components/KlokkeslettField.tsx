import React from "react";
import { Input } from "nav-frontend-skjema";
import { Field } from "react-final-form";

interface KlokkeslettFieldProps {
  name: string;
  label: string;
  id?: string;
}

const KlokkeslettField = ({ name, label, id }: KlokkeslettFieldProps) => (
  <Field<string> name={name}>
    {({ input, meta }) => (
      <Input
        {...input}
        id={id}
        bredde="S"
        autoComplete="off"
        type="time"
        label={label}
        feil={meta.touched && meta.error}
      />
    )}
  </Field>
);

export default KlokkeslettField;
