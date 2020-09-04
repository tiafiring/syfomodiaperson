import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import NavFrontendChevron from 'nav-frontend-chevron';

const texts = {
    buttonText: 'Les mer om funksjonaliteten “Stopp utbetaling”',
    infoBulletpoints: [
        'Til å begynne med kan du bare stoppe utbetalingen til sykmeldte med arbeidsgiver.',
        'Når du stopper den automatiske utbetalingen, blir saken sendt til en saksbehandler.',
        'For å stoppe utbetalingen helt, må du følge den gamle rutinen i Gosys.',
    ],
}

const BlueText = styled.span`
  color: #0067C5;
`

const TextAndChevronWrapper = styled.div`
  cursor: pointer;
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

export const TextDropdown = () => {
    const [showInfo, setShowInfo] = useState(false)
    const [chevronDirection, setChevronDirection] = useState<'ned' | 'opp'>('ned')

    const handleClick = () => {
        setShowInfo(!showInfo)

        const newChevronDirection = chevronDirection === 'ned'
            ? 'opp'
            : 'ned';
        setChevronDirection(newChevronDirection)
    }

    return (<div>
        <TextAndChevronWrapper tabIndex={0} onClick={handleClick} onKeyPress={handleClick}>
            <BlueText>{texts.buttonText}</BlueText>
            <NavFrontendChevron type={chevronDirection} />
        </TextAndChevronWrapper>

        {showInfo && <InfoBox />}
    </div>)
}
