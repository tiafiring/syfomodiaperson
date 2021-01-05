import React from "react";
import cn from "classnames";
import SykmeldingNokkelOpplysning from "./sykmeldinger/sykmelding/sykmeldingOpplysninger/SykmeldingNokkelOpplysning";

interface StatusNokkelopplysningProps {
  children?: any;
  Overskrift?: any;
  tittel: string;
}

export const StatusNokkelopplysning = (
  statusNokkelopplysningProps: StatusNokkelopplysningProps
) => {
  const { children, Overskrift = "h2", tittel } = statusNokkelopplysningProps;
  return (
    <SykmeldingNokkelOpplysning
      className="nokkelopplysning--statusopplysning"
      Overskrift={Overskrift}
      tittel={tittel}
    >
      {children}
    </SykmeldingNokkelOpplysning>
  );
};

interface StatusopplysningerProps {
  children?: any;
}

export const Statusopplysninger = (
  statusopplysningerProps: StatusopplysningerProps
) => {
  const { children } = statusopplysningerProps;
  return <div className="statusopplysninger">{children}</div>;
};

interface StatuspanelProps {
  children?: any;
  enKolonne: boolean;
}

const Statuspanel = (statuspanelProps: StatuspanelProps) => {
  const { children, enKolonne = false } = statuspanelProps;
  const classNames = cn("panel panel--komprimert blokk statuspanel", {
    "statuspanel--toKol": !enKolonne,
    "statuspanel--enKol": enKolonne,
  });
  return <div className={classNames}>{children}</div>;
};

export default Statuspanel;
