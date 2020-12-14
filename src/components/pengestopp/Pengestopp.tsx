import * as React from "react";
import { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import AlertStripe from "nav-frontend-alertstriper";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PengestoppModal from "./PengestoppModal";
import PengestoppDropdown from "./PengestoppDropdown";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";
import {
  Arbeidsgiver,
  Status,
  StatusEndring,
} from "../../data/pengestopp/types/FlaggPerson";
import { FlaggpersonState } from "../../data/pengestopp/flaggperson";
import { unikeArbeidsgivereMedSykmeldingSiste3Maneder } from "../../utils/pengestoppUtils";

export const texts = {
  stansSykepenger: "Stanse sykepenger?",
  explanation:
    "Her sender du beskjed til NAV Arbeid og ytelser om at de må se nærmere på saken. Foreløpig må du også lage notat i Gosys med begrunnelse.",
  hentingFeiletMessage:
    "Vi har problemer med baksystemene. Du kan sende beskjeden, men det vil ikke bli synlig her før vi er tilbake i normal drift",
  sykmeldtNotEligibleError:
    "Den sykmeldte behandles ikke i vedtaksløsningen. Du må sende en “Vurder konsekvens for ytelse”-oppgave i Gosys, jf servicerutinene.",
};

const Wrapper = styled.div`
  margin: 1rem 0;
`;

interface IPengestoppProps {
  sykmeldinger: SykmeldingOldFormat[];
  flaggperson: FlaggpersonState;
  fnr: string;
}

const Alert = styled(AlertStripe)`
  margin-bottom: 1em;
`;

interface KnappWithExplanationProps {
  handleClick: () => void;
}

const KnappWithExplanation = ({ handleClick }: KnappWithExplanationProps) => {
  return (
    <>
      <Knapp type="hoved" mini onClick={handleClick}>
        {texts.stansSykepenger}
      </Knapp>
      <p>{texts.explanation}</p>
    </>
  );
};

const Pengestopp = ({ sykmeldinger }: IPengestoppProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const flaggperson: FlaggpersonState = useSelector(
    (state: any) => state.flaggperson
  );
  const [sykmeldtNotEligible, setSykmeldtNotEligible] = useState(false);

  const toggleModal = (arbeidsgivere: Arbeidsgiver[]) => {
    if (arbeidsgivere.length === 0) {
      setSykmeldtNotEligible(true);
    } else {
      setSykmeldtNotEligible(false);
      setModalIsOpen(!modalIsOpen);
    }
  };

  const statusEndringList: StatusEndring[] = flaggperson.data;

  const pengestopp: StatusEndring | undefined = statusEndringList.find(
    (statusEndring: StatusEndring) =>
      statusEndring.status === Status.STOPP_AUTOMATIKK
  );

  const uniqueArbeidsgivereWithSykmeldingLast3Months = unikeArbeidsgivereMedSykmeldingSiste3Maneder(
    sykmeldinger
  );

  return (
    <Wrapper>
      {flaggperson.hentingFeilet && (
        <Alert type="feil">{texts.hentingFeiletMessage}</Alert>
      )}
      {sykmeldtNotEligible && (
        <Alert type="feil">{texts.sykmeldtNotEligibleError}</Alert>
      )}

      {pengestopp?.status === Status.STOPP_AUTOMATIKK ? (
        <PengestoppDropdown
          statusEndringList={statusEndringList}
          sykmeldinger={sykmeldinger}
        />
      ) : (
        <KnappWithExplanation
          handleClick={() => {
            toggleModal(uniqueArbeidsgivereWithSykmeldingLast3Months);
          }}
        />
      )}

      <PengestoppModal
        arbeidsgivere={uniqueArbeidsgivereWithSykmeldingLast3Months}
        isOpen={modalIsOpen}
        toggle={() => {
          toggleModal(uniqueArbeidsgivereWithSykmeldingLast3Months);
        }}
      />
    </Wrapper>
  );
};

export default Pengestopp;
