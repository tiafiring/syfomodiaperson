import * as React from 'react';
import { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import PengestoppModal from './PengestoppModal';
import styled from 'styled-components';
import PengestoppDropdown from './PengestoppDropdown';
import { connect } from 'react-redux';
import {
    Status,
    StatusEndring,
} from '../../types/FlaggPerson';
import { initialState as FlaggPerson } from '../../reducers/flaggperson';
import { senesteTom } from "../../utils/periodeUtils";
import { gamleSMStatuser } from "../../utils/sykmeldinger/sykmeldingstatuser";

const texts = {
    stansSykepenger: 'Stans sykepenger',
};

const Wrapper = styled.div`
    margin: 1rem 0;
`;

export interface Arbeidsgiver {
    navn: string,
    orgnummer: string,
}

export interface Periode {
    tom: Date,
}

export interface Sykmelding {
    arbeidsgiver: string,
    orgnummer: string,
    pasient: {
        fnr: string
    },
    mulighetForArbeid: {
        perioder: Periode[]
    }
    status: String,
}

export interface IPengestoppProps {
    brukernavn: String,
    sykmeldinger: Array<Sykmelding>,
    flaggperson: typeof FlaggPerson,
    fnr: string,
}

const sykmeldingerToArbeidsgiver = (sykmeldinger: Array<Sykmelding>) => {
    return sykmeldinger.map((sykmelding) => {
        return {
            navn: sykmelding.arbeidsgiver,
            orgnummer: sykmelding.orgnummer,
        };
    });
};

const uniqueArbeidsgivere = (arbeidsgivere: Array<Arbeidsgiver>) => {
    return arbeidsgivere.filter((arbeidsgiver, index, self) => {
        return self.findIndex((arbeidsgiver2) => {
            return arbeidsgiver.orgnummer === arbeidsgiver2.orgnummer;
        }) === index;
    });
};

const allStoppAutomatikkStatusEndringer = (statusEndringer: Array<StatusEndring>) => {
    return statusEndringer.filter((statusEndring) => {
        return statusEndring.status === Status.STOPP_AUTOMATIKK;
    });
};

const arbeidsgivereWithStoppAutomatikkStatus = (arbeidsgivere: Array<Arbeidsgiver>, statusEndringerWithStoppAutomatikk: Array<StatusEndring>) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return statusEndringerWithStoppAutomatikk.find((statusEndring) => {
            return statusEndring.virksomhetNr.value === arbeidsgiver.orgnummer;
        });
    });
};

const aktiveSykmeldingerFraSiste3Maneder = (sykmeldinger: Sykmelding[]) => {
    const threeMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 90);
    return sykmeldinger.filter((sykmelding) => {
        return senesteTom(sykmelding.mulighetForArbeid.perioder) >= threeMonthsAgo && sykmelding.status === gamleSMStatuser.SENDT;
    });
};

const unikeArbeidsgivereMedSykmeldingSiste3Maneder = (sykmeldinger: Sykmelding[]) => {
    const sykmeldingerSiste3Maneder = aktiveSykmeldingerFraSiste3Maneder(sykmeldinger)

    const arbeidsgiverFromSykmeldinger = sykmeldingerToArbeidsgiver(sykmeldingerSiste3Maneder);

    return uniqueArbeidsgivere(arbeidsgiverFromSykmeldinger);
}

const Pengestopp = ({ brukernavn, sykmeldinger, flaggperson }: IPengestoppProps) => {
    const [modalIsOpen, setModelIsOpen] = useState(false);

    const toggleModal = () => {
        setModelIsOpen(!modalIsOpen);
    };

    const data: StatusEndring[] = flaggperson.data;

    const pengestopp: StatusEndring | undefined =
        data.find((statusEndring: StatusEndring) => statusEndring.status === Status.STOPP_AUTOMATIKK);

    const statusEndringerWithStoppedAutomatikk = allStoppAutomatikkStatusEndringer(data);
    const uniqueArbeidsgivereWithSykmeldingLast3Months = unikeArbeidsgivereMedSykmeldingSiste3Maneder(sykmeldinger);

    const allTimeUniqueArbeidsgivere = uniqueArbeidsgivere(sykmeldingerToArbeidsgiver(sykmeldinger));

    const stoppedArbeidsgivere = arbeidsgivereWithStoppAutomatikkStatus(allTimeUniqueArbeidsgivere, statusEndringerWithStoppedAutomatikk); // TODO Dette må gjøres om til å bli alle AGer som er stoppet, uavhengig av om de har aktiv sykmelding eller ikke.

    return (
        <Wrapper>
            {pengestopp?.status === Status.STOPP_AUTOMATIKK
                ? <PengestoppDropdown dato={pengestopp.opprettet} stoppedArbeidsgivere={stoppedArbeidsgivere} />
                : <Knapp type="fare" onClick={toggleModal}>{texts.stansSykepenger}</Knapp>
            }

            <PengestoppModal brukernavn={brukernavn} statusEndringer={data} arbeidsgivere={uniqueArbeidsgivereWithSykmeldingLast3Months} isOpen={modalIsOpen} toggle={toggleModal} />
        </Wrapper>
    );
};

const mapStateToProps = (state: { flaggperson: { data: StatusEndring[] } }) => {
    const { flaggperson } = state;
    return { flaggperson };
};

export default connect(mapStateToProps)(Pengestopp);
