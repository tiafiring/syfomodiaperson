import React from "react";

interface SidetoppProps {
  tittel: string;
  htmlTekst?: any;
}

const Sidetopp = (sidetoppProps: SidetoppProps) => {
  const { tittel, htmlTekst } = sidetoppProps;
  return (
    <header className="sidetopp js-sidetopp">
      <h1 className="sidetopp__tittel">{tittel}</h1>
      {htmlTekst && (
        <div className="sidetopp__intro js-intro">
          <p dangerouslySetInnerHTML={htmlTekst} />
        </div>
      )}
    </header>
  );
};

export default Sidetopp;
