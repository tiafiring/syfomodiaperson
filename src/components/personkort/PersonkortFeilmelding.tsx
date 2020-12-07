import React from "react";
import Alertstripe from "nav-frontend-alertstriper";

interface PersonkortFeilmeldingProps {
  children: any;
}

const PersonkortFeilmelding = (
  personkortFeilmeldingProps: PersonkortFeilmeldingProps
) => {
  const { children } = personkortFeilmeldingProps;
  return <Alertstripe type="info">{children}</Alertstripe>;
};

export default PersonkortFeilmelding;
