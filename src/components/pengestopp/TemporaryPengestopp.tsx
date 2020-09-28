import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { texts as pengestoppTexts} from './Pengestopp';
import TextDropdown from '../TextDropdown';
import { InformationIconWithText } from './InformationIconWithText';


const texts = {
    ...pengestoppTexts,
    information: 'Her vil du kunne stoppe en automatisk utbetaling av sykepenger hvis du mener brukeren ikke fyller ett eller flere vilkår. Du vil få nærmere beskjed om når knappen kan tas i bruk.',
    buttonText: 'Les mer om “Stopp utbetaling”',
    infoBulletpoints: [
        'Når du stopper den automatiske utbetalingen, blir saken sendt til en saksbehandler før utbetaling.',
        'Du må også sende en “Vurder konsekvens for ytelse”-oppgave i Gosys, jf servicerutinene.',
        'Til å begynne med kan du bare stoppe utbetalingen til sykmeldte med arbeidsgiver. Sykmeldte uten arbeidsgiver behandles foreløpig ikke i vedtaksløsningen.',
    ],
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

const InfoBox = () => {
    return <div>
        <ul>
            {texts.infoBulletpoints.map((text, index) => {
                return <li key={index}><p>{text}</p></li>
            })}
        </ul>
    </div>
}

export const TemporaryPengestopp = () => {
    return (<GrayPanel>
        <InnerPanel>
            <Knapp className="TemporaryPengestopp__knapp" type="fare" mini onClick={noOp}>{texts.stansSykepenger}</Knapp>
            <InformationIconWithText text={texts.information} />
            <TextDropdown title={texts.buttonText}>
                <InfoBox />
            </TextDropdown>
        </InnerPanel>
    </GrayPanel>)
}


const noOp = () => {}
