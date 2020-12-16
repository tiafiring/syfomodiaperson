import React from "react";
import Knapp from "nav-frontend-knapper";

interface VerktoylinjeProps {
  children: any;
}

export const Verktoylinje = (verktoylinjeProps: VerktoylinjeProps) => {
  return <div className="verktoylinje">{verktoylinjeProps.children}</div>;
};

interface VerktoyKnappProps {
  children?: any;
}

export const VerktoyKnapp = (verktoyKnappProps: VerktoyKnappProps) => {
  const { children } = verktoyKnappProps;
  return (
    <div className="verktoylinje__element">
      <Knapp type="standard" mini disabled>
        {children}
      </Knapp>
    </div>
  );
};
