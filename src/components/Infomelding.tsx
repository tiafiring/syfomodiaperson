import React from "react";

interface InfomeldingProps {
  tittel: string;
  melding: string;
}

const Infomelding = (infomeldingProps: InfomeldingProps) => {
  const { tittel, melding } = infomeldingProps;
  return (
    <div className="panel panel--melding">
      <h3 className="hode hode--info infomelding">{tittel}</h3>
      <p>{melding}</p>
    </div>
  );
};

export default Infomelding;
