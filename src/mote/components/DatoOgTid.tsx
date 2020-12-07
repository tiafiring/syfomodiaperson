import React from "react";
import { visDato, visKlokkeslett } from "../../utils/datoUtils";

interface DatoOgTidProps {
  tid: Date;
  className?: string;
}

const DatoOgTid = (datoOgTidProps: DatoOgTidProps) => {
  const { tid, className = "" } = datoOgTidProps;
  return (
    <h4 className={`motetidspunkt__label ${className}`}>
      <strong>{visDato(tid)}</strong>
      <span>kl. {visKlokkeslett(tid)}</span>
    </h4>
  );
};

export default DatoOgTid;
