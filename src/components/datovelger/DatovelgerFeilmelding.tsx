import React from "react";
import PropTypes from "prop-types";

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

DatovelgerFeilmelding.propTypes = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DatovelgerFeilmelding;
