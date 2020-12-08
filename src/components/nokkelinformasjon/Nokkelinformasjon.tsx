import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { hentVirksomhet } from "../../data/virksomhet/virksomhet_actions";
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
    aktiveDialoger,
    fnr,
    oppfolgingstilfelleUtenArbeidsgiver,
    oppfolgingstilfelleperioder,
    sykmeldinger,
  } = meldingTilArbeidsgiverProps;

  const dispatch = useDispatch();

  useEffect(() => {
    aktiveDialoger.forEach((dialog: any) => {
      if (!dialog.virksomhet.navn) {
        dispatch(hentVirksomhet(dialog.virksomhet.virksomhetsnummer));
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
