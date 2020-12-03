import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { keyValue, sykmelding as sykmeldingPt } from "@navikt/digisyfo-npm";
import Sidetopp from "../Sidetopp";
import UtdragFraSykefravaeret from "../motebehov/UtdragFraSykefravaeret";

const texts = {
  pageTitle: "Nøkkelinformasjon",
  comingSoon: `
       Denne siden er under utvikling. 
    `,
};

const AlertStripeDevelopment = styled(AlertStripeInfo)`
  margin: 0 0 1em 0;
`;

const Nokkelinformasjon = ({
  actions,
  aktiveDialoger,
  fnr,
  ledetekster,
  oppfolgingstilfelleUtenArbeidsgiver,
  oppfolgingstilfelleperioder,
  sykmeldinger,
}) => {
  useEffect(() => {
    aktiveDialoger.forEach((dialog) => {
      if (!dialog.virksomhet.navn) {
        actions.hentVirksomhet(dialog.virksomhet.virksomhetsnummer);
      }
    });
  }, []);

  return (
    <div>
      <Sidetopp tittel={texts.pageTitle} />

      <AlertStripeDevelopment>{texts.comingSoon}</AlertStripeDevelopment>

      <UtdragFraSykefravaeret
        aktiveDialoger={aktiveDialoger}
        fnr={fnr}
        ledetekster={ledetekster}
        oppfolgingstilfelleUtenArbeidsgiver={
          oppfolgingstilfelleUtenArbeidsgiver
        }
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger}
      />
    </div>
  );
};

Nokkelinformasjon.propTypes = {
  actions: PropTypes.object,
  aktiveDialoger: PropTypes.arrayOf(PropTypes.object),
  fnr: PropTypes.string,
  ledetekster: keyValue,
  oppfolgingstilfelleUtenArbeidsgiver: PropTypes.object,
  oppfolgingstilfelleperioder: PropTypes.object,
  sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export default Nokkelinformasjon;
