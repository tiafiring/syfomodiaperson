import React, { Component } from "react";
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
       Sykmeldingsoversikten viser foreløpig ikke sykmeldinger hvor det ikke er oppgitt arbeidsgiver. 
    `,
};

const AlertStripeDevelopment = styled(AlertStripeInfo)`
  margin: 0 0 1em 0;
`;

export class Nokkelinformasjon extends Component {
  componentDidMount() {
    const { actions, aktiveDialoger } = this.props;
    aktiveDialoger.forEach((dialog) => {
      if (!dialog.virksomhet.navn) {
        actions.hentVirksomhet(dialog.virksomhet.virksomhetsnummer);
      }
    });
  }

  render() {
    const {
      aktiveDialoger,
      fnr,
      ledetekster,
      oppfolgingstilfelleperioder,
      sykmeldinger,
    } = this.props;
    return (
      <div>
        <Sidetopp tittel={texts.pageTitle} />

        <AlertStripeDevelopment>{texts.comingSoon}</AlertStripeDevelopment>

        <UtdragFraSykefravaeret
          aktiveDialoger={aktiveDialoger}
          fnr={fnr}
          ledetekster={ledetekster}
          oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
          sykmeldinger={sykmeldinger}
        />
      </div>
    );
  }
}

Nokkelinformasjon.propTypes = {
  actions: PropTypes.object,
  aktiveDialoger: PropTypes.arrayOf(PropTypes.object),
  fnr: PropTypes.string,
  ledetekster: keyValue,
  oppfolgingstilfelleperioder: PropTypes.object,
  sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export default Nokkelinformasjon;
