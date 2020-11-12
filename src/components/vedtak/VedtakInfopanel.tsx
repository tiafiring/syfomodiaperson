import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { restdatoTildato } from '../../utils/datoUtils';
import { VedtakDTO } from '../../reducers/vedtak';
import Panel from 'nav-frontend-paneler';
import VedtakOppsummering from './VedtakOppsummering';
import VedtakUtbetaltePerioder from './VedtakUtbetaltePerioder';
import styled from 'styled-components';
import { Row } from 'nav-frontend-grid';


interface IVedtakInfopanel {
    selectedVedtak: VedtakDTO,
}

const StyledPanel = styled(Panel)`
    padding: 1.5em
`;

const VedtakInfopanel = (vedtakIProps: IVedtakInfopanel) => {
    const { selectedVedtak } = vedtakIProps;

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
