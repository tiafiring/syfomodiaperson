import React from "react";

interface SykmeldingNokkelOpplysningProps {
  tittel: string;
  children?: any;
  className?: string;
  Overskrift?: any;
}

const SykmeldingNokkelOpplysning = (
  sykmeldingNokkelOpplysningProps: SykmeldingNokkelOpplysningProps
) => {
  const {
    tittel,
    children,
    className = "",
    Overskrift = "h3",
  } = sykmeldingNokkelOpplysningProps;
  return (
    <div className={`nokkelopplysning ${className}`}>
      {tittel ? (
        <Overskrift
          className="nokkelopplysning__tittel"
          dangerouslySetInnerHTML={{ __html: tittel }}
        />
      ) : null}
      {children}
    </div>
  );
};

export default SykmeldingNokkelOpplysning;
