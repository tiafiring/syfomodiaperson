import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EtikettBase from 'nav-frontend-etiketter';
import { formaterOrgnr } from '../../../utils';
import { lederHasActiveSykmelding } from '../../../utils/ledereUtils';
import kanskjeBooleanTilJaNeiKanskje from '../kanskjeBooleanTilJaNeiKanskje';

const texts = {
    activeSykmelding: 'Sykmeldt nå',
};

const GridRow = styled.div`
    width: 100%;
    display: inline-grid;
    grid-template-columns: 4fr 2fr 2fr 2fr;
    grid-template-rows: 1fr;
    gap: 0em .5em;
    font-weight: 800;
    background-color: @navGra60;
`;

const FlexColumn = styled.div`
    display: flex;
    align-items: flex-end;
`;

const HeaderStyled = styled.div`
    background-color: #E7E9E9;
    padding: .5em;
    border: none;
`;

const PersonKortVirksomhetLederHeaderStyled = styled.div`
    margin-bottom: 2em;
`;

const textVirksomhetsnummer = (orgnummer) => {
    return `Org.nr.: ${formaterOrgnr(orgnummer)}`;
};

const textForskuttering = (arbeidsgiverForskuttererLoenn) => {
    return `Forsk.: ${kanskjeBooleanTilJaNeiKanskje(arbeidsgiverForskuttererLoenn)}`;
};

const PersonKortVirksomhetHeader = ({ currentLeder, sykmeldinger, children }) => {
    const virksomhetsnummerText = textVirksomhetsnummer(currentLeder.orgnummer);
    const forskutteringText = textForskuttering(currentLeder.arbeidsgiverForskuttererLoenn);
    const activeSykmeldingText = lederHasActiveSykmelding(currentLeder, sykmeldinger) && texts.activeSykmelding;
    return (
        <PersonKortVirksomhetLederHeaderStyled>
            <HeaderStyled className="personkortElement__tittel">
                <img src="/sykefravaer/img/svg/fabrikk.svg" alt="Fabrikk" />
                <GridRow>
                    <FlexColumn>{currentLeder.organisasjonsnavn}</FlexColumn>
                    <FlexColumn>{virksomhetsnummerText}</FlexColumn>
                    <FlexColumn>{forskutteringText}</FlexColumn>
                    {activeSykmeldingText &&
                    <FlexColumn>
                        <EtikettBase className="personkortElement__tittelLabel" type="info">
                            {activeSykmeldingText}
                        </EtikettBase>
                    </FlexColumn>
                    }
                </GridRow>
            </HeaderStyled>
            {children}
        </PersonKortVirksomhetLederHeaderStyled>
    );
};
PersonKortVirksomhetHeader.propTypes = {
    children: PropTypes.node,
    currentLeder: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export default PersonKortVirksomhetHeader;
