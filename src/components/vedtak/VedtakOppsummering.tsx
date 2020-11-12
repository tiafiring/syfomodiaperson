import * as React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { restdatoTildato } from '../../utils/datoUtils';
import { VedtakDTO } from '../../reducers/vedtak';
import styled from 'styled-components';

const texts = {
    oppsummering: 'Oppsummering',
    maksdato: 'Maksdato',
    vedtaksdato: 'Vedtaksdato',
    dagerGjenstar: 'Dager gjenstår',
    dagerBrukt: 'Dager brukt hittil',
    totalSykepengedager: 'Sykepengedager totalt',
};

interface IVedtakOppsummering {
    selectedVedtak: VedtakDTO,
}

const StyledUndertittel = styled(Undertittel)`
    margin-top: .5em;
    margin-bottom: .5em;
`;


const VedtakOppsummering = (vedtakOppsummering: IVedtakOppsummering) => {
    const { selectedVedtak } = vedtakOppsummering;
    return (
        <>
            <Row><StyledUndertittel>{texts.oppsummering}</StyledUndertittel></Row>
            <Row>
                <Column className='col-xs-4'>
                    <Row><Normaltekst>{texts.maksdato}</Normaltekst></Row>
                    <Row><Normaltekst>{texts.vedtaksdato}</Normaltekst></Row>
                    <Row><Normaltekst>{texts.dagerGjenstar}</Normaltekst></Row>
                    <Row><Normaltekst>{texts.dagerBrukt}</Normaltekst></Row>
                    <Row><Normaltekst>{texts.totalSykepengedager}</Normaltekst></Row>
                </Column>
                <Column className='col-xs-2'>
                    <Row><Normaltekst>{restdatoTildato(selectedVedtak.vedtak.tom)}</Normaltekst></Row>
                    <Row><Normaltekst>{restdatoTildato(selectedVedtak.opprettet)}</Normaltekst></Row>
                    <Row><Normaltekst>{selectedVedtak.vedtak.gjenståendeSykedager}</Normaltekst></Row>
                    <Row><Normaltekst>{selectedVedtak.vedtak.forbrukteSykedager}</Normaltekst></Row>
                    <Row><Normaltekst>{selectedVedtak.vedtak.forbrukteSykedager + selectedVedtak.vedtak.gjenståendeSykedager}</Normaltekst></Row>
                </Column>
            </Row>
        </>
    );
};

export default VedtakOppsummering;
