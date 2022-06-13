import React, { useState } from "react";
import { PERSONKORTVISNING_TYPE } from "@/konstanter";
import PersonkortHeader from "./PersonkortHeader";
import PersonkortVisning from "./PersonkortVisning";
import Utvidbar from "../Utvidbar";
import { useNavBrukerData } from "@/data/navbruker/navbruker_hooks";
import SnowButton from "@/components/personkort/SnowButton";
import { isDecember } from "@/utils/festiveUtils";
import { FlexRow, PaddingSize } from "../Layout";
import { OversiktLenker } from "@/components/personkort/OversiktLenker";
import WelcomeMessage from "@/components/personkort/WelcomeMessage";

const texts = {
  buttons: {
    sykmeldt: "Kontaktinformasjon",
    leder: "Nærmeste leder",
    fastlege: "Fastlege",
    enhet: "Behandlende enhet",
  },
};

const Personkort = () => {
  const [visning, setVisning] = useState(PERSONKORTVISNING_TYPE.SYKMELDT);
  const navbruker = useNavBrukerData();
  const showSnowButton = isDecember();

  return (
    <div className="personkort">
      <FlexRow topPadding={PaddingSize.SM} bottomPadding={PaddingSize.SM}>
        <OversiktLenker />
        <WelcomeMessage />
        {showSnowButton && <SnowButton />}
      </FlexRow>
      <Utvidbar
        erApen={false}
        tittel={<PersonkortHeader navbruker={navbruker} />}
      >
        <div>
          <ul>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.SYKMELDT &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.SYKMELDT}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.SYKMELDT);
                }}
              >
                {texts.buttons.sykmeldt}
              </button>
            </li>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.LEDER &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.LEDER}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.LEDER);
                }}
              >
                {texts.buttons.leder}
              </button>
            </li>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.LEGE &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.LEGE}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.LEGE);
                }}
              >
                {texts.buttons.fastlege}
              </button>
            </li>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.ENHET &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.ENHET}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.ENHET);
                }}
              >
                {texts.buttons.enhet}
              </button>
            </li>
          </ul>

          <div aria-live="polite">
            <PersonkortVisning navbruker={navbruker} visning={visning} />
          </div>
        </div>
      </Utvidbar>
    </div>
  );
};

export default Personkort;
