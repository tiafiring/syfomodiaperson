import React from "react";
import { finnArbeidstakerMotebehovSvar } from "../../utils/motebehovUtils";
import { tilLesbarDatoMedArUtenManedNavn } from "../../utils/datoUtils";

export const lederMedGittAktorId = (aktorId: string, ledere: any) => {
  return ledere.find((leder: any) => {
    return leder.aktoerId === aktorId;
  });
};

export const arbeidsgiverNavnEllerTomStreng = (leder: any) => {
  return leder && leder.navn ? `${leder.navn}` : "";
};

export const setSvarIkon = (deltakerOnskerMote?: any) => {
  switch (deltakerOnskerMote) {
    case true: {
      return "/sykefravaer/img/svg/motebehov--kan.svg";
    }
    case false: {
      return "/sykefravaer/img/svg/motebehov--kanikke.svg";
    }
    default: {
      return "/sykefravaer/img/svg/motebehov--ikkesvart.svg";
    }
  }
};

export const setSvarTekst = (deltakerOnskerMote?: any) => {
  switch (deltakerOnskerMote) {
    case true: {
      return " har svart JA";
    }
    case false: {
      return " har svart NEI";
    }
    default: {
      return " har ikke svart";
    }
  }
};

const svarTidspunkt = (motebehov?: any) => {
  return motebehov && motebehov.opprettetDato
    ? tilLesbarDatoMedArUtenManedNavn(motebehov.opprettetDato)
    : "Ikke svart";
};

const ikonAlternativTekst = (deltakerOnskerMote: any) => {
  switch (deltakerOnskerMote) {
    case true: {
      return "Svart ja.";
    }
    case false: {
      return "Svart nei.";
    }
    default: {
      return "Ikke svart.";
    }
  }
};

export const bareArbeidsgiversMotebehov = (motebehov: any) => {
  return motebehov.opprettetAv !== motebehov.aktorId;
};

export const setArbeidsgiverTekst = (
  leder: any,
  arbeidsgiverOnskerMote?: any
) => {
  const arbeidsgiverNavn = arbeidsgiverNavnEllerTomStreng(leder);
  const arbeidsgiverBedrift =
    leder && leder.organisasjonsnavn ? `${leder.organisasjonsnavn},` : "";
  return `<b>Arbeidsgiveren: </b> ${arbeidsgiverNavn} ${arbeidsgiverBedrift} ${setSvarTekst(
    arbeidsgiverOnskerMote
  )}`;
};

interface MotebehovKvitteringInnholdProps {
  deltakerOnskerMote?: boolean;
  ikonAltTekst: string;
  motebehov?: any;
  tekst: string;
}

export const MotebehovKvitteringInnhold = (
  motebehovKvitteringInnholdProps: MotebehovKvitteringInnholdProps
) => {
  const {
    deltakerOnskerMote,
    ikonAltTekst,
    motebehov,
    tekst,
  } = motebehovKvitteringInnholdProps;
  const skalViseForklaring =
    motebehov && motebehov.motebehovSvar && motebehov.motebehovSvar.forklaring;
  return (
    <div className="motebehovKvitteringBoksInnhold">
      <div>
        <img
          className="svarstatus__ikon"
          src={setSvarIkon(deltakerOnskerMote)}
          alt={ikonAltTekst}
        />
        <span>{svarTidspunkt(motebehov)}</span>
      </div>
      <div>
        <span dangerouslySetInnerHTML={{ __html: tekst }} />
        {skalViseForklaring && <p>{motebehov.motebehovSvar.forklaring}</p>}
      </div>
    </div>
  );
};

interface MotebehovKvitteringInnholdArbeidstakerProps {
  arbeidstakersMotebehov: any;
  sykmeldt: any;
}

export const MotebehovKvitteringInnholdArbeidstaker = (
  motebehovKvitteringInnholdArbeidstakerProps: MotebehovKvitteringInnholdArbeidstakerProps
) => {
  const {
    arbeidstakersMotebehov,
    sykmeldt,
  } = motebehovKvitteringInnholdArbeidstakerProps;
  const arbeidstakerOnskerMote =
    arbeidstakersMotebehov && arbeidstakersMotebehov.motebehovSvar.harMotebehov;
  const arbeidstakerTekst = `<b>Den sykmeldte: </b> ${
    sykmeldt.navn
  } ${setSvarTekst(arbeidstakerOnskerMote)}`;
  const ikonAltTekst = `Sykmeldt ${ikonAlternativTekst(
    arbeidstakerOnskerMote
  )}`;

  return (
    <MotebehovKvitteringInnhold
      deltakerOnskerMote={arbeidstakerOnskerMote}
      ikonAltTekst={ikonAltTekst}
      motebehov={arbeidstakersMotebehov}
      tekst={arbeidstakerTekst}
    />
  );
};

interface MotebehovKvitteringInnholdArbeidsgiverProps {
  motebehovListeMedBareArbeidsgiversMotebehov: any[];
  ledereData: any[];
}

export const MotebehovKvitteringInnholdArbeidsgiver = (
  motebehovKvitteringInnholdArbeidsgiverProps: MotebehovKvitteringInnholdArbeidsgiverProps
) => {
  const {
    motebehovListeMedBareArbeidsgiversMotebehov,
    ledereData,
  } = motebehovKvitteringInnholdArbeidsgiverProps;
  return (
    <>
      {motebehovListeMedBareArbeidsgiversMotebehov.map(
        (motebehov: any, index: number) => {
          const arbeidsgiverOnskerMote = motebehov.motebehovSvar.harMotebehov;
          const riktigLeder = lederMedGittAktorId(
            motebehov.opprettetAv,
            ledereData
          );
          const ikonAltTekst = `Arbeidsgiver ${arbeidsgiverNavnEllerTomStreng(
            riktigLeder
          )} ${ikonAlternativTekst(arbeidsgiverOnskerMote)}`;

          return (
            <MotebehovKvitteringInnhold
              key={index}
              deltakerOnskerMote={arbeidsgiverOnskerMote}
              ikonAltTekst={ikonAltTekst}
              motebehov={motebehov}
              tekst={setArbeidsgiverTekst(riktigLeder, arbeidsgiverOnskerMote)}
            />
          );
        }
      )}
    </>
  );
};

interface MotebehovKvitteringInnholdArbeidsgiverUtenMotebehovProps {
  ledereUtenInnsendtMotebehov: any[];
}

export const MotebehovKvitteringInnholdArbeidsgiverUtenMotebehov = (
  motebehovKvitteringInnholdArbeidsgiverUtenMotebehovProps: MotebehovKvitteringInnholdArbeidsgiverUtenMotebehovProps
) => {
  const {
    ledereUtenInnsendtMotebehov,
  } = motebehovKvitteringInnholdArbeidsgiverUtenMotebehovProps;
  return (
    <>
      {ledereUtenInnsendtMotebehov.map((leder: any, index: number) => {
        const ikonAltTekst = `Arbeidsgiver ${arbeidsgiverNavnEllerTomStreng(
          leder
        )} ${ikonAlternativTekst(undefined)}`;
        return (
          <MotebehovKvitteringInnhold
            key={index}
            ikonAltTekst={ikonAltTekst}
            tekst={setArbeidsgiverTekst(leder)}
          />
        );
      })}
    </>
  );
};

interface MotebehovKvitteringProps {
  ledereData: any[];
  ledereUtenInnsendtMotebehov: any[];
  motebehovListe: any[];
  sykmeldt: any;
}

const MotebehovKvittering = (
  motebehovKvitteringProps: MotebehovKvitteringProps
) => {
  const {
    ledereData,
    ledereUtenInnsendtMotebehov,
    motebehovListe,
    sykmeldt,
  } = motebehovKvitteringProps;
  return (
    <div className="panel motebehovKvitteringInnhold">
      <MotebehovKvitteringInnholdArbeidstaker
        arbeidstakersMotebehov={finnArbeidstakerMotebehovSvar(motebehovListe)}
        sykmeldt={sykmeldt}
      />
      <MotebehovKvitteringInnholdArbeidsgiver
        motebehovListeMedBareArbeidsgiversMotebehov={motebehovListe.filter(
          bareArbeidsgiversMotebehov
        )}
        ledereData={ledereData}
      />
      <MotebehovKvitteringInnholdArbeidsgiverUtenMotebehov
        ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
      />
    </div>
  );
};

export default MotebehovKvittering;
