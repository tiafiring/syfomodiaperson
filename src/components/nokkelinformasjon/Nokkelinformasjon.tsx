import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
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

interface MeldingTilArbeidsgiverProps {
  actions: any;
  aktiveDialoger: any;
  fnr: string;
  oppfolgingstilfelleUtenArbeidsgiver: any;
  oppfolgingstilfelleperioder: any;
  sykmeldinger: any;
}

const Nokkelinformasjon = (
  meldingTilArbeidsgiverProps: MeldingTilArbeidsgiverProps
) => {
  const {
    actions,
    aktiveDialoger,
    fnr,
    oppfolgingstilfelleUtenArbeidsgiver,
    oppfolgingstilfelleperioder,
    sykmeldinger,
  } = meldingTilArbeidsgiverProps;
  useEffect(() => {
    aktiveDialoger.forEach((dialog: any) => {
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
        oppfolgingstilfelleUtenArbeidsgiver={
          oppfolgingstilfelleUtenArbeidsgiver
        }
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger}
      />
    </div>
  );
};

export default Nokkelinformasjon;
