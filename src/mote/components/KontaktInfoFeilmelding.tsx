import React from "react";
import AlertStripe from "nav-frontend-alertstriper";

interface KontaktInfoFeilmeldingProps {
  melding: any;
}

const KontaktInfoFeilmelding = (
  kontaktInfoFeilmeldingProps: KontaktInfoFeilmeldingProps
) => {
  const { melding } = kontaktInfoFeilmeldingProps;
  return (
    <div className="panel">
      <AlertStripe type="advarsel">
        <div dangerouslySetInnerHTML={melding} />
      </AlertStripe>
    </div>
  );
};

export default KontaktInfoFeilmelding;
