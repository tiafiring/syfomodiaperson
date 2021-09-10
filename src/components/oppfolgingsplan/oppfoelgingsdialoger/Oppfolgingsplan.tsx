import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Knapp from "nav-frontend-knapper";
import { DokumentinfoDTO } from "@/data/oppfolgingsplan/types/DokumentinfoDTO";
import { OppfolgingsplanDTO } from "@/data/oppfolgingsplan/oppfoelgingsdialoger";
import { hentDokumentinfo } from "@/data/oppfolgingsplan/dokumentinfo_actions";
import Feilmelding from "../../Feilmelding";
import AppSpinner from "../../AppSpinner";
import { SYFOOPPFOLGINGSPLANSERVICE_ROOT } from "@/apiConstants";
import { useAppSelector } from "@/hooks/hooks";

interface PlanVisningProps {
  dokumentinfo?: DokumentinfoDTO;
  oppfolgingsplan: OppfolgingsplanDTO;
}

const PlanVisning = ({ dokumentinfo, oppfolgingsplan }: PlanVisningProps) => {
  const bildeUrler: string[] = [];
  if (dokumentinfo) {
    for (let i = 1; i <= dokumentinfo.antallSider; i += 1) {
      bildeUrler.push(
        `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/dokument/${oppfolgingsplan.id}/side/${i}`
      );
    }
  }

  const TilbakeTilOppfolgingsplaner = () => {
    return (
      <div className="blokk">
        <Link to={`/sykefravaer/oppfoelgingsplaner`} className="tilbakelenke">
          Til oppfølgingsplaner
        </Link>
      </div>
    );
  };

  return (
    <div className="blokk--l">
      <TilbakeTilOppfolgingsplaner />
      <div className="pdfbilder blokk--s">
        {bildeUrler.map((bildeUrl, index) => {
          return (
            <div key={index} className="pdfbilde">
              <img
                width="944"
                height="1222"
                className="pdfbilde__bilde"
                key={bildeUrl}
                src={bildeUrl}
                alt="Bilde av oppfølgingsplan"
              />
            </div>
          );
        })}
      </div>
      <TilbakeTilOppfolgingsplaner />
      <div className="knapperad">
        <Knapp
          type="standard"
          onClick={() => {
            const newWindow = window.open(
              `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/dokument/${oppfolgingsplan.id}`
            );
            newWindow?.print();
          }}
        >
          Skriv ut
        </Knapp>
      </div>
    </div>
  );
};

interface OppfolgingsplanProps {
  oppfolgingsplan: OppfolgingsplanDTO;
}

const Oppfolgingsplan = ({ oppfolgingsplan }: OppfolgingsplanProps) => {
  const dispatch = useDispatch();
  const dokumentinfoState = useAppSelector((state) => state.dokumentinfo);
  const { data, hentingFeilet, hentingForsokt } =
    dokumentinfoState[oppfolgingsplan.id] || {};

  useEffect(() => {
    dispatch(hentDokumentinfo(oppfolgingsplan.id));
  }, [dispatch, oppfolgingsplan.id]);

  return (() => {
    if (!hentingForsokt) {
      return <AppSpinner />;
    }
    if (hentingFeilet) {
      return <Feilmelding />;
    }
    return (
      <PlanVisning oppfolgingsplan={oppfolgingsplan} dokumentinfo={data} />
    );
  })();
};

export default Oppfolgingsplan;
