import { Element, Normaltekst } from "nav-frontend-typografi";
import { Field } from "react-final-form";
import React, { ReactElement } from "react";
import { referatTexts } from "../../../data/dialogmote/dialogmoteTexts";
import styled from "styled-components";
import { ReferatCheckbox } from "./ReferatCheckbox";
import { FlexColumn, FlexRow } from "../../Layout";
import { ReferatInfoColumn } from "./ReferatInfoColumn";

const texts = {
  header: "Dette informerte NAV om i møtet",
  subHeader: "Velg bare de alternativene du faktisk informerte om i møtet.",
  info:
    "Det blir hentet opp standardtekster i referatet avhengig av hva du velger.",
};

const Header = styled(Element)`
  margin-bottom: 1em;
`;

const Subheader = styled(Normaltekst)`
  margin-bottom: 1em;
`;

export const StandardTekster = (): ReactElement => (
  <FlexRow>
    <FlexColumn flex={1}>
      <Header>{texts.header}</Header>
      <Subheader>{texts.subHeader}</Subheader>
      {referatTexts.standardTekster.map(({ label, text }, index) => (
        <Field<string>
          key={index}
          name="standardtekster"
          type="checkbox"
          value={text}
        >
          {({ input }) => <ReferatCheckbox {...input} label={label} />}
        </Field>
      ))}
    </FlexColumn>
    <ReferatInfoColumn>
      <Normaltekst>{texts.info}</Normaltekst>
    </ReferatInfoColumn>
  </FlexRow>
);
