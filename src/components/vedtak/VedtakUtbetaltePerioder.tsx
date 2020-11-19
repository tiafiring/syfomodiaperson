import * as React from 'react';
import { Row } from 'nav-frontend-grid';
import {
    Ingress,
    Normaltekst,
    Undertittel,
} from 'nav-frontend-typografi';
import {
    Utbetaling,
    Utbetalingslinje,
    VedtakDTO,
} from '../../reducers/vedtak';
import { restdatoTildato } from '../../utils/datoUtils';
import styled from 'styled-components';

const texts = {
    utbetalt: 'Utbetalte perioder til nå',
};

interface VedtakUtbetaltePerioderProps {
    selectedVedtak: VedtakDTO,
}

const StyledIngress = styled(Ingress)`
    margin-top: .5em;
`;

const displayUtbetaling = (utbetaling: Utbetaling) => {
    return utbetaling.utbetalingslinjer.map(
        (linje: Utbetalingslinje) => {
            const amount = new Intl.NumberFormat(
                'no-NO',
                { minimumFractionDigits: 2 },
            ).format(linje.beløp);

            return (
                <>
                    <StyledIngress>
                        {restdatoTildato(linje.fom)} - {restdatoTildato(linje.tom)}
                    </StyledIngress>
                    <Normaltekst>{linje.grad} % sykmeldt</Normaltekst>
                    <Normaltekst>
                        {`Beløp per dag: ${amount} kr`}
                    </Normaltekst>
                </>
            );
        },
    );
};

const StyledUndertittel = styled(Undertittel)`
    margin-top: .5em;
`;

const VedtakUtbetaltePerioder = (utbetaltePerioderProps: VedtakUtbetaltePerioderProps) => {
    const { selectedVedtak } = utbetaltePerioderProps;

    return (
        <Row>
            <StyledUndertittel>{texts.utbetalt}</StyledUndertittel>
            {selectedVedtak.vedtak.utbetalinger.map((utbetaling: Utbetaling) => displayUtbetaling(utbetaling))}
        </Row>
    );
};

export default VedtakUtbetaltePerioder;
