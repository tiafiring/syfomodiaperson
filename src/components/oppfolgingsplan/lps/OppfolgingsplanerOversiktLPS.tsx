import React from "react";
import styled from "styled-components";
import Panel from "nav-frontend-paneler";
import {
  restdatoTilLesbarDato,
  toDatePrettyPrint,
} from "../../../utils/datoUtils";
import { isPersonOppgaveBehandlet } from "../../../utils/personOppgaveUtils";
import { OppfolgingsplanLPS } from "../../../data/oppfolgingsplan/types/OppfolgingsplanLPS";
import BehandleOppfolgingsplanLPS from "./BehandleOppfolgingsplanLPS";
import OppfolgingsplanLPSEtikett from "./OppfolgingsplanLPSEtikett";
import { StatusKanImage } from "../../../../img/ImageComponents";
import { SYFOOPPFOLGINGSPLANSERVICE_ROOT } from "../../../apiConstants";

const texts = {
  buttonOpenPlan: "Åpne oppfølgingsplanen(pdf)",
};

const UnderTittelInline = styled.h3`
  display: inline-block;
`;

const DivMarginBottom = styled.div`
  margin-bottom: 1em;
`;

const LPSPlanPanel = styled(Panel)`
  margin-bottom: 0.5em;
  padding: 2em 4em 2em 2em;
`;

interface ButtonOpenPlanProps {
  oppfolgingsplanLPS: OppfolgingsplanLPS;
}

export const ButtonOpenPlan = (buttonOpenPlanProps: ButtonOpenPlanProps) => {
  return (
    <a
      className="lenke"
      href={`${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/dokument/lps/${buttonOpenPlanProps.oppfolgingsplanLPS.uuid}`}
      download="oppfølgingsplan"
    >
      {texts.buttonOpenPlan}
    </a>
  );
};

interface BehandleOppfolgingsplanLPSProps {
  oppfolgingsplanLPSBistandsbehov: OppfolgingsplanLPS;
  veilederIdent: string;
}

const OppfolgingsplanerOversiktLPS = (
  behandleOppfolgingsplanLPSProps: BehandleOppfolgingsplanLPSProps
) => {
  const {
    oppfolgingsplanLPSBistandsbehov,
    veilederIdent,
  } = behandleOppfolgingsplanLPSProps;
  const personOppgave = oppfolgingsplanLPSBistandsbehov.personoppgave;
  const erPersonOppgaveBehandlet = isPersonOppgaveBehandlet(personOppgave);
  return (
    <LPSPlanPanel>
      <UnderTittelInline className="panel__tittel">
        {oppfolgingsplanLPSBistandsbehov.virksomhetsnavn}
      </UnderTittelInline>
      <p>
        Mottatt:{" "}
        {restdatoTilLesbarDato(oppfolgingsplanLPSBistandsbehov.opprettet)}
      </p>
      <DivMarginBottom>
        <OppfolgingsplanLPSEtikett />
      </DivMarginBottom>
      <DivMarginBottom>
        <ButtonOpenPlan oppfolgingsplanLPS={oppfolgingsplanLPSBistandsbehov} />
      </DivMarginBottom>
      {personOppgave && !erPersonOppgaveBehandlet && (
        <BehandleOppfolgingsplanLPS
          oppfolgingsplanLPS={oppfolgingsplanLPSBistandsbehov}
          veilederIdent={veilederIdent}
        />
      )}
      {personOppgave && erPersonOppgaveBehandlet && (
        <p>
          <span className="ferdigbehandlet__ikon">
            <img src={StatusKanImage} alt="Ferdig behandlet" />
          </span>{" "}
          {`Ferdigbehandlet: ${toDatePrettyPrint(
            personOppgave.behandletTidspunkt
          )} av ${personOppgave.behandletVeilederIdent}`}
        </p>
      )}
    </LPSPlanPanel>
  );
};

export default OppfolgingsplanerOversiktLPS;
