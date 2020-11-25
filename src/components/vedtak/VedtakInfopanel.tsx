import * as React from 'react';
import styled from 'styled-components';
import { Row } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { restdatoTildato } from '../../utils/datoUtils';
import { VedtakDTO } from '../../reducers/vedtak';
import VedtakMetaInformasjon from "./VedtakMetaInformasjon";
import VedtakOppsummering from './VedtakOppsummering';
import VedtakUtbetaltePerioder from './VedtakUtbetaltePerioder';
import VedtakAnnullertAlertStripe from './VedtakAnnullertAlertStripe';


interface VedtakInfopanelProps {
    selectedVedtak: VedtakDTO,
}

const StyledPanel = styled(Panel)`
    padding: 1.5em;
    margin-bottom: .5em;
`;

const AlertStripeRow = styled(Row)`
    margin-top: 2em;
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
            <VedtakMetaInformasjon selectedVedtak={selectedVedtak}/>
            <VedtakUtbetaltePerioder selectedVedtak={selectedVedtak}/>
            <VedtakOppsummering selectedVedtak={selectedVedtak}/>
            {selectedVedtak.annullert &&
            <AlertStripeRow>
                <VedtakAnnullertAlertStripe />
            </AlertStripeRow>
            }
        </StyledPanel>
    );
};

export default VedtakInfopanel;
