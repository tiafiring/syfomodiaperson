import React from "react";
import { Link } from "react-router";

interface TilbakelenkeProps {
  to: string;
  tekst: string;
}

const Tilbakelenke = (tilbakelenkeProps: TilbakelenkeProps) => {
  const { to, tekst } = tilbakelenkeProps;
  return (
    <div className="blokk">
      <Link to={to} className="tilbakelenke">
        {tekst}
      </Link>
    </div>
  );
};

export default Tilbakelenke;
