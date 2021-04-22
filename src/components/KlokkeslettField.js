import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-maskedinput";
import { SkjemaelementFeilmelding } from "nav-frontend-skjema";

const KlokkeslettField = (props) => {
  const { meta, className } = props;
  return (
    <div>
      <MaskedInput
        className={`skjemaelement__input ${className}${
          meta.touched && meta.error ? " skjemaelement__input--harFeil" : ""
        }`}
        mask="11.11"
        autoComplete="off"
        placeholder={props.placeholder}
        type={props.type || "text"}
        id={props.id}
        {...props.input}
      />
      <SkjemaelementFeilmelding>
        {meta.touched && meta.error}
      </SkjemaelementFeilmelding>
    </div>
  );
};

KlokkeslettField.propTypes = {
  meta: PropTypes.object,
  id: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
};

export default KlokkeslettField;
