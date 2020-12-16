import React from "react";
import Panel from "nav-frontend-paneler";

interface SpeilingvarselProps {
  brukernavn: string;
}

const Speilingvarsel = (speilingvarselProps: SpeilingvarselProps) => {
  const { brukernavn } = speilingvarselProps;
  return (
    <Panel className="panel panel--komprimert blokk--s">
      <p>
        Dette er slik <strong>{brukernavn}</strong> ser det på nav.no
      </p>
    </Panel>
  );
};

export default Speilingvarsel;
