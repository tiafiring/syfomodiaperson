import React from "react";
import styled from "styled-components";
import { AlertstripeFullbredde } from "../../AlertstripeFullbredde";
import { Element, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import navFarger from "nav-frontend-core";

const TeksterAlert = styled(AlertstripeFullbredde)`
  margin-bottom: 4em;
  .lenke {
    color: ${navFarger.navBla} !important;
  }
`;

const texts = {
  header: "Arbeidstakeren får denne beskjeden sammen med innkallingen:",
  body1: "Det er obligatorisk å delta i dialogmøter i løpet av sykefraværet.",
  body2: "Passer ikke møtetidspunktet? ",
  linkText: "Ta kontakt for å gjøre en ny avtale.",
  linkUrl: "",
};

export const DialogmoteInnkallingTeksterAlert = () => {
  return (
    <TeksterAlert type="info">
      <Element>{texts.header}</Element>
      <Normaltekst>{texts.body1}</Normaltekst>
      <Normaltekst>
        {texts.body2}
        <Lenke target="_blank" rel="noopener noreferrer" href={texts.linkUrl}>
          {texts.linkText}
        </Lenke>
      </Normaltekst>
    </TeksterAlert>
  );
};
