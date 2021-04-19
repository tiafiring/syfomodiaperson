import React, { ReactElement } from "react";
import OppsummeringSporsmal from "./OppsummeringSporsmal";
import {
  SvarTypeDTO,
  SykepengesoknadDTO,
} from "../../../../data/sykepengesoknad/types/SykepengesoknadDTO";

export const getKey = (tag: string, id?: string | number): string =>
  `${tag}_${id}`;

interface OppsummeringsvisningProps {
  soknad: SykepengesoknadDTO;
}

const Oppsummeringsvisning: ({
  soknad: { sporsmal },
}: OppsummeringsvisningProps) => ReactElement = ({
  soknad: { sporsmal },
}: OppsummeringsvisningProps) => (
  <>
    {sporsmal
      .filter(
        (sporsmal) =>
          sporsmal.svar.length > 0 ||
          sporsmal.undersporsmal.length > 0 ||
          sporsmal.svartype === SvarTypeDTO.IKKE_RELEVANT
      )
      .map((sporsmal) => (
        <div
          className="oppsummering__seksjon"
          key={getKey(sporsmal.tag, sporsmal.id)}
        >
          <OppsummeringSporsmal {...sporsmal} />
        </div>
      ))}
  </>
);

export default Oppsummeringsvisning;
