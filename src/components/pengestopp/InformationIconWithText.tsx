import * as React from 'react';
import styled from 'styled-components';

interface InformationIconWithTextProps {
    text: String
}

const InformationBox = styled.div`
  display: flex;
  align-items: flex-start;
`

const InformationText = styled.span`
  font-weight: bold;
  margin-left: .5em;
`

export const InformationIconWithText = ({text}: InformationIconWithTextProps) => {
    return (<InformationBox>
        <img src="/sykefravaer/img/svg/information_circle.svg" alt="informasjon" />
        <InformationText>{text}</InformationText>
    </InformationBox>)
}
