import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { texts as pengestoppTexts} from './Pengestopp';
import { TextDropdown } from './TextDropdown';
import { InformationIconWithText } from './InformationIconWithText';


const texts = {
    ...pengestoppTexts,
    information: 'Her vil det komme ny funksjonalitet for å stanse automatisk utbetaling av sykepenger.',
}
const GrayPanel = styled.div`
  border: #979797 dashed 1px;
  background-color: #E7E9E9;
  margin-bottom:1em;
`

const InnerPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1em;
  
  > div, .TemporaryPengestopp__knapp {
    margin-bottom: 1em;
  }
`

export const TemporaryPengestopp = () => {
    return (<GrayPanel>
        <InnerPanel>
            <Knapp className="TemporaryPengestopp__knapp" type="fare" mini onClick={noOp}>{texts.stansSykepenger}</Knapp>
            <InformationIconWithText text={texts.information} />
            <TextDropdown />
        </InnerPanel>
    </GrayPanel>)
}


const noOp = () => {}
