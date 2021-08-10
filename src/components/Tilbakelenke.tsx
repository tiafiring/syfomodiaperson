import React from "react";
import { Link } from "react-router-dom";

interface TilbakelenkeProps {
  to: string;
  tekst: string;
}

const Tilbakelenke = ({ to, tekst }: TilbakelenkeProps) => {
  return (
    <div className="blokk">
      <Link to={to} className="tilbakelenke">
        {tekst}
      </Link>
    </div>
  );
};

export default Tilbakelenke;
