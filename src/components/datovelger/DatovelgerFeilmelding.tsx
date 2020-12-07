import React from "react";

interface FeilmeldingProps {
  touched: any;
  error?: any;
}

const DatovelgerFeilmelding = (feilmeldingProps: FeilmeldingProps) => {
  const { touched, error } = feilmeldingProps;
  return (
    <p className="skjemaelement__feilmelding" aria-live="polite">
      {touched && error}
    </p>
  );
};

export default DatovelgerFeilmelding;
