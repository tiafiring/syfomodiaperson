import React from "react";
import Panel from "nav-frontend-paneler";

interface FeilmeldingProps {
  tittel?: string;
  melding?: any;
}

const Feilmelding = (feilmeldingProps: FeilmeldingProps) => {
  const {
    tittel = "Beklager, det oppstod en feil",
    melding = { __html: "<p>Vennligst prøv igjen litt senere.</p>" },
  } = feilmeldingProps;
  return (
    <Panel className="panel--melding">
      <h3 className="hode hode--feil">{tittel}</h3>
      <div dangerouslySetInnerHTML={melding} />
    </Panel>
  );
};

export default Feilmelding;
