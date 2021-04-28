import * as React from "react";
import styled from "styled-components";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { PopoverOrientering } from "nav-frontend-popover";

const texts = {
  title: "Om beregningen",
  subtitle:
    "Hvordan beregner vi hvor lenge sykefraværet sannsynligvis vil vare?",
  factors:
    "I modellen bruker vi data fra sykmeldingen: sykmeldingsgraden, bostedet, yrket, alderen, diagnosen, legen og arbeidsgiveren.",
  comparison:
    "Når modellen beregner sannsynligheten for at personen blir friskmeldt, baserer den seg på tilsvarende data fra alle som tidligere har vært sykmeldt i minst 17 uker. Vi sammenlikner altså personen med alle andre sykmeldte.",
  week17:
    "Uke 17 er valgt for at du kan bruke resultatet når du skal beslutte om dialogmøte 2 er nødvendig. Du får se de tre viktigste faktorene som trekker sannsynligheten opp, og de tre viktigste faktorene som trekker den ned.",
};

const BoldText = styled.p`
  font-weight: bold;
`;

const InfoText = () => {
  return (
    <>
      <BoldText>{texts.title}</BoldText>
      <BoldText>{texts.subtitle}</BoldText>
      <p>{texts.factors}</p>
      <p>{texts.comparison}</p>
      <p>{texts.week17}</p>
    </>
  );
};

const PrediksjonHjelpetekst = () => {
  return (
    <Hjelpetekst type={PopoverOrientering.Venstre} id="1">
      <InfoText />
    </Hjelpetekst>
  );
};

export default PrediksjonHjelpetekst;
