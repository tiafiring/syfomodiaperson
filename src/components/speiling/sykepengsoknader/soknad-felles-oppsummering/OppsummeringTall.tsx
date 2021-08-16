import React, { ReactElement } from "react";
import OppsummeringSporsmalscontainer from "./OppsummeringSporsmalscontainer";
import OppsummeringSporsmalstekst from "./OppsummeringSporsmalstekst";
import { getKey } from "./Oppsummeringsvisning";
import { OppsummeringSporsmalProps } from "./OppsummeringSporsmal";
import { SvarTypeDTO } from "@/data/sykepengesoknad/types/SykepengesoknadDTO";

const texts = {
  timerTot: "timer totalt",
  prosent: "prosent",
};

const OppsummeringTall = ({
  svar,
  sporsmalstekst,
  tag,
  overskriftsnivaa,
  svartype,
  undertekst,
}: OppsummeringSporsmalProps): ReactElement => {
  const text = svartype === SvarTypeDTO.TIMER ? texts.timerTot : texts.prosent;
  const label = undertekst || text;
  return (
    <OppsummeringSporsmalscontainer tag={tag}>
      <OppsummeringSporsmalstekst overskriftsnivaa={overskriftsnivaa}>
        {sporsmalstekst}
      </OppsummeringSporsmalstekst>
      <div className="oppsummering__tekstsvar">
        {svar.map((svarverdi, index) => (
          <p className="oppsummering__tekst" key={getKey(tag, index)}>
            {svarverdi.verdi} {label}
          </p>
        ))}
      </div>
    </OppsummeringSporsmalscontainer>
  );
};

export default OppsummeringTall;
