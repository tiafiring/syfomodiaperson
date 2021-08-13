import React, { ReactElement } from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { EkspanderbartpanelBaseProps } from "nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base";

const UtvidbarHistorikk = (
  props: EkspanderbartpanelBaseProps
): ReactElement => {
  return (
    <div className="blokk--s">
      <Ekspanderbartpanel {...props} />
    </div>
  );
};

export default UtvidbarHistorikk;
