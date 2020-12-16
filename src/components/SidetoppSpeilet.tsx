import React from "react";

interface SidetoppSpeiletProps {
  tittel: string;
  htmlTekst?: any;
}

const SidetoppSpeilet = (sidetoppSpeiletProps: SidetoppSpeiletProps) => {
  const { tittel, htmlTekst } = sidetoppSpeiletProps;
  return (
    <header className="sidetoppSpeilet">
      <h1 className="sidetoppSpeilet__tittel">{tittel}</h1>
      {htmlTekst && (
        <div className="sidetoppSpeilet__intro side-innhold js-intro">
          <p dangerouslySetInnerHTML={htmlTekst} />
        </div>
      )}
    </header>
  );
};

export default SidetoppSpeilet;
