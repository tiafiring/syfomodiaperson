import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Lenke from "nav-frontend-lenker";
import { OppfolgingsplanDTO } from "../../data/oppfolgingsplan/oppfoelgingsdialoger";
import { hentOppfolgingsplanerLPS } from "../../data/oppfolgingsplan/oppfolgingsplanerlps_actions";
import { OppfolgingsplanerlpsState } from "../../data/oppfolgingsplan/oppfolgingsplanerlps";
import { useAppSelector } from "../../hooks/hooks";
import { OppfolgingstilfelleperioderMapState } from "../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import { lpsPlanerWithActiveTilfelle } from "../../utils/oppfolgingsplanUtils";
import {
  tilLesbarDatoMedArstall,
  tilLesbarPeriodeMedArstall,
} from "../../utils/datoUtils";
import { OppfolgingsplanLPS } from "../../data/oppfolgingsplan/types/OppfolgingsplanLPS";
import { hentPersonOppgaver } from "../../data/personoppgave/personoppgave_actions";
import { PersonOppgave } from "../../data/personoppgave/types/PersonOppgave";
import { hentVirksomhet } from "../../data/virksomhet/virksomhet_actions";
import { H3NoMargins } from "../Layout";

const texts = {
  header: "Oppfølgingsplan",
  ingenPlanerDelt: "Ingen planer er delt med NAV",
};

interface AktiveDialogerProps {
  aktiveDialoger: OppfolgingsplanDTO[];
}

const AktivDialog = styled.div`
  margin-top: 0.5em;
  margin-bottom: 1em;

  a {
    text-transform: capitalize;
  }
`;

const Gyldighetsperiode = styled.span`
  margin-left: 2em;
`;

const AktiveDialoger = ({ aktiveDialoger }: AktiveDialogerProps) => {
  return (
    <>
      {aktiveDialoger.map((dialog, index) => {
        const virksomhetsNavn = dialog.virksomhet.navn;
        return (
          <AktivDialog key={index}>
            <span>
              <Lenke
                className="lenke"
                href={`/sykefravaer/oppfoelgingsplaner/${dialog.id}`}
              >
                {virksomhetsNavn && virksomhetsNavn.length > 0
                  ? virksomhetsNavn.toLowerCase()
                  : dialog.virksomhet.virksomhetsnummer}
              </Lenke>
            </span>
            <Gyldighetsperiode>
              {tilLesbarPeriodeMedArstall(
                dialog.godkjentPlan.gyldighetstidspunkt.fom,
                dialog.godkjentPlan.gyldighetstidspunkt.tom
              )}
            </Gyldighetsperiode>
          </AktivDialog>
        );
      })}
    </>
  );
};

interface LpsPlanerProps {
  lpsPlaner: OppfolgingsplanLPS[];
}

const LpsPlaner = ({ lpsPlaner }: LpsPlanerProps) => {
  return (
    <>
      {lpsPlaner.map((plan, index) => {
        const lesbarDato = tilLesbarDatoMedArstall(plan.opprettet);
        const virksomhet = plan.virksomhetsnavn || plan.virksomhetsnummer;
        return (
          <div key={index}>
            <a
              className="lenke"
              href={`${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/dokument/lps/${plan.uuid}`}
              download="oppfølgingsplan"
            >
              {`${virksomhet} (pdf)`}
            </a>
            <span>{` innsendt ${lesbarDato} (LPS)`}</span>
          </div>
        );
      })}
    </>
  );
};

interface OppfolgingsplanerProps {
  aktiveDialoger: OppfolgingsplanDTO[];
  lpsPlaner: OppfolgingsplanLPS[];
}

const Oppfolgingsplaner = ({
  aktiveDialoger,
  lpsPlaner,
}: OppfolgingsplanerProps) => {
  return (
    <div>
      <AktiveDialoger aktiveDialoger={aktiveDialoger} />
      <LpsPlaner lpsPlaner={lpsPlaner} />
    </div>
  );
};

interface UtdragOppfolgingsplanerProps {
  fnr: string;
  aktiveDialoger: OppfolgingsplanDTO[];
}

const UtdragOppfolgingsplanerWrapper = styled.div`
  margin-bottom: 2.5em;

  h3 {
    margin-bottom: 0;
  }
`;

export const UtdragOppfolgingsplaner = ({
  aktiveDialoger,
  fnr,
}: UtdragOppfolgingsplanerProps) => {
  const dispatch = useDispatch();

  const personOppgaveList: PersonOppgave[] = useAppSelector(
    (state) => state.personoppgaver.data
  );

  useEffect(() => {
    dispatch(hentPersonOppgaver(fnr));
  }, [fnr]);

  useEffect(() => {
    dispatch(hentOppfolgingsplanerLPS(fnr));
  }, [personOppgaveList]);

  const oppfolgingsplanerlpsState: OppfolgingsplanerlpsState = useAppSelector(
    (state) => state.oppfolgingsplanerlps
  );

  const oppfolgingstilfelleperioderMapState: OppfolgingstilfelleperioderMapState = useAppSelector(
    (state) => state.oppfolgingstilfelleperioder
  );

  const activeLpsPlaner = lpsPlanerWithActiveTilfelle(
    oppfolgingsplanerlpsState.data,
    oppfolgingstilfelleperioderMapState
  );

  useEffect(() => {
    activeLpsPlaner.forEach((plan: OppfolgingsplanLPS) => {
      dispatch(hentVirksomhet(plan.virksomhetsnummer));
    });

    aktiveDialoger?.forEach((plan: OppfolgingsplanDTO) => {
      dispatch(hentVirksomhet(plan.virksomhet.virksomhetsnummer));
    });
  }, [activeLpsPlaner, aktiveDialoger]);

  const anyActivePlaner =
    aktiveDialoger?.length > 0 || activeLpsPlaner.length > 0;

  return (
    <UtdragOppfolgingsplanerWrapper>
      <H3NoMargins>{texts.header}</H3NoMargins>
      {anyActivePlaner ? (
        <Oppfolgingsplaner
          aktiveDialoger={aktiveDialoger}
          lpsPlaner={activeLpsPlaner}
        />
      ) : (
        <p>{texts.ingenPlanerDelt}</p>
      )}
    </UtdragOppfolgingsplanerWrapper>
  );
};
