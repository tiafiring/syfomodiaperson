import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { restdatoTildato } from '../../utils/datoUtils';
import { VedtakDTO } from '../../reducers/vedtak';
import Panel from 'nav-frontend-paneler';
import VedtakOppsummering from './VedtakOppsummering';
import VedtakUtbetaltePerioder from './VedtakUtbetaltePerioder';
import styled from 'styled-components';
import { Row } from 'nav-frontend-grid';


interface VedtakInfopanelProps {
    selectedVedtak: VedtakDTO,
}

const StyledPanel = styled(Panel)`
    padding: 1.5em;
    margin-bottom: .5em;
`;

const VedtakInfopanel = (vedtakProps: VedtakInfopanelProps) => {
    const { selectedVedtak } = vedtakProps;

    return (
        <StyledPanel>
            <Row>
                <Innholdstittel>
                    {`${restdatoTildato(selectedVedtak.vedtak.fom)} - ${restdatoTildato(selectedVedtak.vedtak.tom)}`}
                </Innholdstittel>
            </Row>
            <VedtakUtbetaltePerioder selectedVedtak={selectedVedtak}/>
            <VedtakOppsummering selectedVedtak={selectedVedtak}/>
        </StyledPanel>
    );
};

export default VedtakInfopanel;
