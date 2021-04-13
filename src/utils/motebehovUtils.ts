import { dagerMellomDatoer } from "./datoUtils";
import { startDateFromLatestActiveTilfelle } from "./periodeUtils";
import { MotebehovDTO } from "../data/motebehov/types/motebehovTypes";
import { OppfolgingstilfelleperioderMapState } from "../data/oppfolgingstilfelle/oppfolgingstilfelleperioder";

export const sorterMotebehovDataEtterDato = (
  a: MotebehovDTO,
  b: MotebehovDTO
) => {
  return b.opprettetDato === a.opprettetDato
    ? 0
    : b.opprettetDato > a.opprettetDato
    ? 1
    : -1;
};

export const finnNyesteMotebehovsvarFraHverDeltaker = (
  sortertMotebehovListe: MotebehovDTO[]
) => {
  return sortertMotebehovListe.filter((motebehov1, index) => {
    return (
      sortertMotebehovListe.findIndex((motebehov2) => {
        return motebehov1.opprettetAv === motebehov2.opprettetAv;
      }) === index
    );
  });
};

export const finnArbeidstakerMotebehovSvar = (
  motebehovListe: MotebehovDTO[]
) => {
  return motebehovListe.find((motebehov) => {
    return motebehov.opprettetAv === motebehov.aktorId;
  });
};
export const OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER = 16 * 7;
export const OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER = 26 * 7;

export const erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker = (
  startOppfolgingsdato: Date
) => {
  const oppfoelgingstilfelleStartDato = new Date(startOppfolgingsdato);
  oppfoelgingstilfelleStartDato.setHours(0, 0, 0, 0);
  const dagensDato = new Date();
  dagensDato.setHours(0, 0, 0, 0);

  const antallDagerSidenOppfoelgingsTilfelleStart = dagerMellomDatoer(
    oppfoelgingstilfelleStartDato,
    dagensDato
  );

  return (
    antallDagerSidenOppfoelgingsTilfelleStart >=
      OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER &&
    antallDagerSidenOppfoelgingsTilfelleStart <
      OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER
  );
};

export const erOppfolgingstilfelleSluttDatoPassert = (
  sluttOppfolgingsdato: Date
) => {
  const oppfolgingstilfelleSluttDato = new Date(sluttOppfolgingsdato);
  oppfolgingstilfelleSluttDato.setHours(0, 0, 0, 0);
  const dagensDato = new Date();
  dagensDato.setHours(0, 0, 0, 0);

  return dagensDato > oppfolgingstilfelleSluttDato;
};

export const harArbeidstakerSvartPaaMotebehov = (motebehovData: any) => {
  return !!finnArbeidstakerMotebehovSvar(motebehovData);
};

export const motebehovUbehandlet = (motebehovListe: MotebehovDTO[]) => {
  return motebehovListe.filter((motebehov) => {
    return (
      motebehov.motebehovSvar &&
      motebehov.motebehovSvar.harMotebehov &&
      !motebehov.behandletTidspunkt
    );
  });
};

const erAlleMotebehovSvarBehandlet = (motebehovListe: MotebehovDTO[]) => {
  return motebehovUbehandlet(motebehovListe).length === 0;
};

export const erMotebehovBehandlet = (motebehovListe: MotebehovDTO[]) => {
  return erAlleMotebehovSvarBehandlet(motebehovListe);
};

export const harUbehandletMotebehov = (motebehovListe: MotebehovDTO[]) => {
  return !erAlleMotebehovSvarBehandlet(motebehovListe);
};

export const hentSistBehandletMotebehov = (
  motebehovListe: MotebehovDTO[]
): MotebehovDTO | undefined =>
  [...motebehovListe].sort((mb1: MotebehovDTO, mb2: MotebehovDTO) => {
    if (mb2.behandletTidspunkt === mb1.behandletTidspunkt) {
      return 0;
    }
    if ((mb2.behandletTidspunkt ?? "") > (mb1.behandletTidspunkt ?? "")) {
      return 1;
    }
    return -1;
  })[0];

export const motebehovlisteMedKunJaSvar = (motebehovliste: MotebehovDTO[]) => {
  return motebehovliste.filter((motebehov) => {
    return motebehov.motebehovSvar && motebehov.motebehovSvar.harMotebehov;
  });
};

export const motebehovFromLatestActiveTilfelle = (
  sortertMotebehovListe: MotebehovDTO[],
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState
) => {
  const startDateNewestActiveTilfelle = startDateFromLatestActiveTilfelle(
    oppfolgingstilfelleperioder
  );

  if (startDateNewestActiveTilfelle === null) {
    return motebehovUbehandlet(sortertMotebehovListe);
  }

  const motebehovFromLatestActiveTilfelle = sortertMotebehovListe.filter(
    (svar) => {
      return svar.opprettetDato >= startDateNewestActiveTilfelle;
    }
  );
  if (motebehovFromLatestActiveTilfelle.length > 0) {
    return motebehovFromLatestActiveTilfelle;
  } else {
    return motebehovUbehandlet(sortertMotebehovListe);
  }
};
