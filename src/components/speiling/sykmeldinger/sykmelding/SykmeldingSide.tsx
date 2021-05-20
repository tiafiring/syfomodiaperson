import React from "react";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import {
  behandlingsutfallStatuser,
  gamleSMStatuser,
} from "../../../../utils/sykmeldinger/sykmeldingstatuser";
import DinSykmelding from "./DinSykmelding";
import DinSendteSykmelding from "./DinSendteSykmelding";
import DinBekreftedeSykmelding from "./DinBekreftedeSykmelding";
import DinAvbrutteSykmelding from "./DinAvbrutteSykmelding";
import DinUtgaatteSykmelding from "./DinUtgaatteSykmelding";
import LenkeTilDineSykmeldinger from "./LenkeTilDineSykmeldinger";
import Feilmelding from "../../../Feilmelding";
import AvvistSykmelding from "./avvisteSykmeldinger/AvvistSykmelding";
import KoronaSykmeldingBekreftet from "./koronasykmeldinger/KoronaSykmelding-Bekreftet";
import KoronaSykmeldingNy from "./koronasykmeldinger/KoronaSykmelding-Ny";
import KoronaSykmeldingAvbrutt from "./koronasykmeldinger/KoronaSykmelding-Avbrutt";

interface SykmeldingSideProps {
  dinSykmelding?: SykmeldingOldFormat;
  arbeidsgiversSykmelding?: SykmeldingOldFormat;
}

const SykmeldingSide = (sykmeldingSideProps: SykmeldingSideProps) => {
  const { dinSykmelding, arbeidsgiversSykmelding } = sykmeldingSideProps;
  return (() => {
    if (!dinSykmelding) {
      return <Feilmelding tittel="Fant ikke sykmelding" />;
    }
    if (
      dinSykmelding.behandlingsutfall.status ===
      behandlingsutfallStatuser.INVALID
    ) {
      return (
        <div>
          <AvvistSykmelding sykmelding={dinSykmelding} />
          <LenkeTilDineSykmeldinger />
        </div>
      );
    }
    if (dinSykmelding.egenmeldt) {
      switch (dinSykmelding.status) {
        case gamleSMStatuser.BEKREFTET: {
          return (
            <div>
              <KoronaSykmeldingBekreftet dinSykmelding={dinSykmelding} />
              <LenkeTilDineSykmeldinger />
            </div>
          );
        }
        case gamleSMStatuser.NY: {
          return (
            <>
              <KoronaSykmeldingNy sykmelding={dinSykmelding} />
              <LenkeTilDineSykmeldinger />
            </>
          );
        }
        case gamleSMStatuser.AVBRUTT: {
          return (
            <div>
              <KoronaSykmeldingAvbrutt sykmelding={dinSykmelding} />
              <LenkeTilDineSykmeldinger />
            </div>
          );
        }
        default: {
          return <Feilmelding tittel="Egenmeldingen har ukjent status" />;
        }
      }
    } else if (
      dinSykmelding.status === gamleSMStatuser.SENDT &&
      arbeidsgiversSykmelding
    ) {
      return (
        <div>
          <DinSendteSykmelding
            dinSykmelding={dinSykmelding}
            arbeidsgiversSykmelding={arbeidsgiversSykmelding}
          />
          <LenkeTilDineSykmeldinger />
        </div>
      );
    } else if (
      arbeidsgiversSykmelding &&
      dinSykmelding.status === gamleSMStatuser.BEKREFTET
    ) {
      return (
        <div>
          <DinBekreftedeSykmelding
            dinSykmelding={dinSykmelding}
            arbeidsgiversSykmelding={arbeidsgiversSykmelding}
          />
          <LenkeTilDineSykmeldinger />
        </div>
      );
    } else if (dinSykmelding.status === gamleSMStatuser.UTGAATT) {
      return (
        <div>
          <DinUtgaatteSykmelding sykmelding={dinSykmelding} />
          <LenkeTilDineSykmeldinger />
        </div>
      );
    } else if (dinSykmelding.status === gamleSMStatuser.NY) {
      return (
        <div>
          <DinSykmelding sykmelding={dinSykmelding} />
          <LenkeTilDineSykmeldinger />
        </div>
      );
    } else if (dinSykmelding.status === gamleSMStatuser.AVBRUTT) {
      return (
        <div>
          <DinAvbrutteSykmelding sykmelding={dinSykmelding} />
          <LenkeTilDineSykmeldinger />
        </div>
      );
    }
    return <Feilmelding tittel="Sykmeldingen har ukjent status" />;
  })();
};

export default SykmeldingSide;
