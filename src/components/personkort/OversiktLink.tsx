import * as React from "react";
import { fullNaisUrlIntern } from "../../utils/miljoUtil";

const texts = {
  link: "Til oversikten",
};

const OversiktLink = () => {
  return (
    <div className="oversiktlenke">
      <a
        href={fullNaisUrlIntern("syfooversikt", "/enhet")}
        className="lenke oversiktlenke__lenke"
      >
        {texts.link}
      </a>
    </div>
  );
};

export default OversiktLink;
