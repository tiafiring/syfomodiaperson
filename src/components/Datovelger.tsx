import React from "react";
import { Field } from "react-final-form";

import { toDatePrettyPrint } from "../utils/datoUtils";
import { Datepicker, isISODateString } from "nav-datovelger";
import dayjs from "dayjs";
import { SkjemaelementFeilmelding } from "nav-frontend-skjema";

export const validerDatoField = (
  value: string | undefined,
  minDate: Date | undefined
) => {
  minDate?.setHours(0, 0, 0, 0);
  if (!value) {
    return "Vennligst angi dato";
  } else if (!isISODateString(value)) {
    return "Datoen er ikke gyldig eller har ikke riktig format (dd.mm.åååå)";
  } else if (minDate && new Date(value) < minDate) {
    return `Datoen må være etter ${toDatePrettyPrint(minDate)}`;
  } else {
    return undefined;
  }
};

interface DatovelgerProps {
  id: string;
  name: string;
  placeholder?: string;
}

const Datovelger = ({ id, name, placeholder }: DatovelgerProps) => {
  const today = new Date();
  return (
    <Field
      name={name}
      id={id}
      validate={(value) => validerDatoField(value, today)}
    >
      {({ input, meta }) => (
        <>
          <Datepicker
            inputId={id}
            limitations={{ minDate: dayjs(today).format("YYYY-MM-DD") }}
            {...input}
            inputProps={{
              placeholder,
              "aria-invalid": meta.submitFailed && meta.error !== undefined,
            }}
          />
          <SkjemaelementFeilmelding>
            {meta.submitFailed && meta.error}
          </SkjemaelementFeilmelding>
        </>
      )}
    </Field>
  );
};
export default Datovelger;
