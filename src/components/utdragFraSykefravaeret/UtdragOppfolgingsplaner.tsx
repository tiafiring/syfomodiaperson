import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

const texts = {
  header: "Oppfølgingsplan",
  ingenPlanerDelt: "Ingen planer er delt med NAV",
};

interface AktiveDialogerProps {
  fnr: string;
  aktiveDialoger: OppfolgingsplanDTO[];
}

const AktiveDialoger = ({ fnr, aktiveDialoger }: AktiveDialogerProps) => {
  return (
    <div>
      {aktiveDialoger.map((dialog, index) => {
        const virksomhetsNavn = dialog.virksomhet.navn;
        return (
          <div key={index} className="utdragFraSykefravaeret__oppfolgingsplan">
            <span>
              <Lenke
                className="lenke"
                href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}
              >
                {virksomhetsNavn && virksomhetsNavn.length > 0
                  ? virksomhetsNavn.toLowerCase()
                  : dialog.virksomhet.virksomhetsnummer}
              </Lenke>
            </span>
            <span className="gyldighetsperiode">
              {tilLesbarPeriodeMedArstall(
                dialog.godkjentPlan.gyldighetstidspunkt.fom,
                dialog.godkjentPlan.gyldighetstidspunkt.tom
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

interface LpsPlanerProps {
  lpsPlaner: OppfolgingsplanLPS[];
}

const LpsPlaner = ({ lpsPlaner }: LpsPlanerProps) => {
  return (
    <div>
      {lpsPlaner.map((plan, index) => {
        const lesbarDato = tilLesbarDatoMedArstall(plan.opprettet);
        const virksomhet = plan.virksomhetsnavn
          ? plan.virksomhetsnavn
          : plan.virksomhetsnummer;
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
    </div>
  );
};

interface OppfolgingsplanerProps {
  fnr: string;
  aktiveDialoger: OppfolgingsplanDTO[];
  lpsPlaner: OppfolgingsplanLPS[];
}

const Oppfolgingsplaner = ({
  fnr,
  aktiveDialoger,
  lpsPlaner,
}: OppfolgingsplanerProps) => {
  return (
    <div>
      <AktiveDialoger fnr={fnr} aktiveDialoger={aktiveDialoger} />
      <LpsPlaner lpsPlaner={lpsPlaner} />
    </div>
  );
};

interface UtdragOppfolgingsplanerProps {
  fnr: string;
  aktiveDialoger: OppfolgingsplanDTO[];
}

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
  }, []);

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

  const anyActivePlaner =
    aktiveDialoger?.length > 0 || activeLpsPlaner.length > 0;

  return (
    <div className="utdragFraSykefravaeret__oppfolgingsplaner">
      <h3>{texts.header}</h3>
      {anyActivePlaner ? (
        <Oppfolgingsplaner
          fnr={fnr}
          aktiveDialoger={aktiveDialoger}
          lpsPlaner={activeLpsPlaner}
        />
      ) : (
        <p>{texts.ingenPlanerDelt}</p>
      )}
    </div>
  );
};
