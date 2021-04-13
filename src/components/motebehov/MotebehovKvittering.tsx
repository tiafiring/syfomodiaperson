import React from "react";
import { Leder } from "../../data/leder/ledere";
import { finnArbeidstakerMotebehovSvar } from "../../utils/motebehovUtils";
import { tilLesbarDatoMedArUtenManedNavn } from "../../utils/datoUtils";
import { MotebehovDTO } from "../../data/motebehov/types/motebehovTypes";
import { Brukerinfo } from "../../data/navbruker/types/Brukerinfo";

export const lederMedGittAktorId = (aktorId: string, ledere: Leder[]) => {
  return ledere.find((leder) => {
    return leder.aktoerId === aktorId;
  });
};

export const arbeidsgiverNavnEllerTomStreng = (leder?: Leder) => {
  return leder && leder.navn ? `${leder.navn}` : "";
};

export const setSvarIkon = (deltakerOnskerMote?: boolean) => {
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

export const setSvarTekst = (deltakerOnskerMote?: boolean) => {
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

const svarTidspunkt = (motebehov?: MotebehovDTO) => {
  return motebehov?.opprettetDato
    ? tilLesbarDatoMedArUtenManedNavn(motebehov.opprettetDato)
    : "Ikke svart";
};

const ikonAlternativTekst = (deltakerOnskerMote?: boolean) => {
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

export const bareArbeidsgiversMotebehov = (motebehov: MotebehovDTO) => {
  return motebehov.opprettetAv !== motebehov.aktorId;
};

export const setArbeidsgiverTekst = (
  leder?: Leder,
  arbeidsgiverOnskerMote?: boolean
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
  motebehov?: MotebehovDTO;
  tekst: string;
}

export const MotebehovKvitteringInnhold = ({
  deltakerOnskerMote,
  ikonAltTekst,
  motebehov,
  tekst,
}: MotebehovKvitteringInnholdProps) => {
  const skalViseForklaring = motebehov?.motebehovSvar?.forklaring;
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
        {skalViseForklaring && <p>{motebehov?.motebehovSvar?.forklaring}</p>}
      </div>
    </div>
  );
};

interface MotebehovKvitteringInnholdArbeidstakerProps {
  arbeidstakersMotebehov?: MotebehovDTO;
  sykmeldt: Brukerinfo;
}

export const MotebehovKvitteringInnholdArbeidstaker = ({
  arbeidstakersMotebehov,
  sykmeldt,
}: MotebehovKvitteringInnholdArbeidstakerProps) => {
  const arbeidstakerOnskerMote =
    arbeidstakersMotebehov?.motebehovSvar?.harMotebehov;
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
  motebehovListeMedBareArbeidsgiversMotebehov: MotebehovDTO[];
  ledereData: Leder[];
}

export const MotebehovKvitteringInnholdArbeidsgiver = ({
  motebehovListeMedBareArbeidsgiversMotebehov,
  ledereData,
}: MotebehovKvitteringInnholdArbeidsgiverProps) => (
  <>
    {motebehovListeMedBareArbeidsgiversMotebehov.map((motebehov, index) => {
      const arbeidsgiverOnskerMote = motebehov.motebehovSvar?.harMotebehov;
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
    })}
  </>
);

interface MotebehovKvitteringInnholdArbeidsgiverUtenMotebehovProps {
  ledereUtenInnsendtMotebehov: Leder[];
}

export const MotebehovKvitteringInnholdArbeidsgiverUtenMotebehov = ({
  ledereUtenInnsendtMotebehov,
}: MotebehovKvitteringInnholdArbeidsgiverUtenMotebehovProps) => (
  <>
    {ledereUtenInnsendtMotebehov.map((leder: Leder, index: number) => {
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

interface MotebehovKvitteringProps {
  ledereData: Leder[];
  ledereUtenInnsendtMotebehov: Leder[];
  motebehovListe: MotebehovDTO[];
  sykmeldt: Brukerinfo;
}

const MotebehovKvittering = ({
  ledereData,
  ledereUtenInnsendtMotebehov,
  motebehovListe,
  sykmeldt,
}: MotebehovKvitteringProps) => (
  <div className="motebehovKvitteringInnhold">
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

export default MotebehovKvittering;
