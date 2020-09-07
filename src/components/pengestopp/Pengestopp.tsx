import * as React from 'react';
import { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PengestoppModal from './PengestoppModal';
import PengestoppDropdown from './PengestoppDropdown';
import {
    Status,
    StatusEndring,
    Sykmelding,
} from '../../types/FlaggPerson';
import { FlaggpersonState } from '../../reducers/flaggperson';
import {
    allStoppAutomatikkStatusEndringer,
    arbeidsgivereWithStoppAutomatikkStatus,
    sykmeldingerToArbeidsgiver,
    unikeArbeidsgivereMedSykmeldingSiste3Maneder,
    uniqueArbeidsgivere,
} from '../../utils/pengestoppUtils';

export const texts = {
    stansSykepenger: 'Stopp utbetaling',
    hentingFeiletMessage: 'Vi klarte dessverre ikke å hente status på denne personen ¯\\_(⊙_ʖ⊙)_/¯ ' +
        'Du kan likevel stoppe utbetalingen, men vi vil ikke klare å vise frem status her i modia før baksystemene er oppe. ' +
        'Dersom du allerede har trykket, har stoppingen gått gjennom, og du trenger ikke trykke igjen selv om det ikke vises her.',
};

const Wrapper = styled.div`
    margin: 1rem 0;
`;

interface IPengestoppProps {
    brukernavn: String,
    sykmeldinger: Sykmelding[],
    flaggperson: FlaggpersonState,
    fnr: string,
}

const Alert = styled(AlertStripe)`
  margin-bottom: 1em;
`

const Pengestopp = ({ brukernavn, sykmeldinger, flaggperson }: IPengestoppProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const data: StatusEndring[] = flaggperson.data;

    const pengestopp: StatusEndring | undefined =
        data.find((statusEndring: StatusEndring) => statusEndring.status === Status.STOPP_AUTOMATIKK);

    const statusEndringerWithStoppedAutomatikk = allStoppAutomatikkStatusEndringer(data);
    const uniqueArbeidsgivereWithSykmeldingLast3Months = unikeArbeidsgivereMedSykmeldingSiste3Maneder(sykmeldinger);

    const allArbeidsgivere = uniqueArbeidsgivere(sykmeldingerToArbeidsgiver(sykmeldinger));

    const stoppedArbeidsgivere = arbeidsgivereWithStoppAutomatikkStatus(allArbeidsgivere, statusEndringerWithStoppedAutomatikk);

    return (
        <Wrapper>
            {flaggperson.hentingFeilet && <Alert type="feil">{texts.hentingFeiletMessage}</Alert>}
            {pengestopp?.status === Status.STOPP_AUTOMATIKK
                ? <PengestoppDropdown dato={pengestopp.opprettet} stoppedArbeidsgivere={stoppedArbeidsgivere} />
                : <Knapp type="fare" onClick={toggleModal}>{texts.stansSykepenger}</Knapp>
            }

            <PengestoppModal brukernavn={brukernavn} statusEndringer={data} arbeidsgivere={uniqueArbeidsgivereWithSykmeldingLast3Months} isOpen={modalIsOpen} toggle={toggleModal} />
        </Wrapper>
    );
};

const mapStateToProps = (state: { flaggperson: FlaggpersonState }) => {
    const { flaggperson } = state;
    return { flaggperson };
};

export default connect(mapStateToProps)(Pengestopp);
