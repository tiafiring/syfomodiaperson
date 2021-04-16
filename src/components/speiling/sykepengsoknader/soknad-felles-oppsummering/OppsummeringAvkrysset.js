import React from "react";
import PropTypes from "prop-types";
import { CheckboxPng } from "../../../../../img/ImageComponents";

const OppsummeringAvkrysset = ({ tekst, id }) => {
  return (
    <div className="oppsummering__avkrysset" id={id}>
      <img src={CheckboxPng} alt="Avkrysset" />
      <span>{tekst}</span>
    </div>
  );
};

OppsummeringAvkrysset.propTypes = {
  tekst: PropTypes.string,
  id: PropTypes.string,
};

export default OppsummeringAvkrysset;
