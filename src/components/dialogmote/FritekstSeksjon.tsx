import { FlexColumn, FlexRow, PaddingSize } from "../Layout";
import { Field } from "react-final-form";
import Fritekst from "../Fritekst";
import { Knapp } from "nav-frontend-knapper";
import React from "react";
import styled from "styled-components";

const texts = {
  forhandsvisning: "Forhåndsvisning",
};

const FritekstWrapper = styled.div`
  margin-bottom: 4em;
`;

interface FritekstSeksjonProps {
  fieldName: string;
  label: string;
  handlePreviewClick: () => void;
  maxLength: number;
}

const FritekstSeksjon = ({
  fieldName,
  label,
  handlePreviewClick,
  maxLength,
}: FritekstSeksjonProps) => (
  <FritekstWrapper>
    <FlexRow bottomPadding={PaddingSize.SM}>
      <FlexColumn flex={1}>
        <Field<string> name={fieldName}>
          {({ input }) => (
            <Fritekst
              size="medium"
              maxLength={maxLength}
              label={label}
              {...input}
            />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
    <FlexRow>
      <Knapp htmlType="button" onClick={handlePreviewClick}>
        {texts.forhandsvisning}
      </Knapp>
    </FlexRow>
  </FritekstWrapper>
);

export default FritekstSeksjon;
