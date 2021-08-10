import React, { ReactNode } from "react";
import Knapp from "nav-frontend-knapper";

interface VerktoylinjeProps {
  children: ReactNode;
}

export const Verktoylinje = (verktoylinjeProps: VerktoylinjeProps) => {
  return <div className="verktoylinje">{verktoylinjeProps.children}</div>;
};

interface VerktoyKnappProps {
  children?: ReactNode;
}

export const VerktoyKnapp = ({ children }: VerktoyKnappProps) => {
  return (
    <div className="verktoylinje__element">
      <Knapp type="standard" mini disabled>
        {children}
      </Knapp>
    </div>
  );
};
