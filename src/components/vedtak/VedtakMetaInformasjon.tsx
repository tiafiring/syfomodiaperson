import * as React from 'react';
import {
    Column,
    Row,
} from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import { VedtakDTO } from '../../reducers/vedtak';
import { restdatoTildato } from '../../utils/datoUtils';
import styled from "styled-components";

const texts = {
    lestDato: 'Lest',
};

interface VedtakMetaInformasjonProps {
    selectedVedtak: VedtakDTO,
}

const isVedtakLest = (vedtak: VedtakDTO) => {
    return vedtak.lest && vedtak.lestDato
}

const RowStyled = styled(Row)`
    margin-top: 1em;
`;

const VedtakMetaInformasjon = (vedtakMetaInformasjonProps: VedtakMetaInformasjonProps) => {
    const { selectedVedtak } = vedtakMetaInformasjonProps;
    return (
        <RowStyled>
            <Column className='col-xs-4'>
                {isVedtakLest(selectedVedtak) &&
                <Row><Normaltekst>{texts.lestDato}</Normaltekst></Row>
                }
            </Column>
            <Column className='col-xs-2'>
                {isVedtakLest(selectedVedtak) &&
                <Row><Normaltekst>{restdatoTildato(selectedVedtak.lestDato)}</Normaltekst></Row>
                }
            </Column>
        </RowStyled>
    );
};

export default VedtakMetaInformasjon;
