export const HENT_BEKREFT_MOTE_ARBEIDSGIVEREPOSTINNHOLD_FORESPURT =
  "HENT_BEKREFT_MOTE_ARBEIDSGIVEREPOSTINNHOLD_FORESPURT";
export const HENTER_ARBEIDSGIVEREPOSTINNHOLD =
  "HENTER_ARBEIDSGIVEREPOSTINNHOLD";
export const ARBEIDSGIVEREPOSTINNHOLD_HENTET =
  "ARBEIDSGIVEREPOSTINNHOLD_HENTET";
export const HENT_ARBEIDSGIVEREPOSTINNHOLD_FEILET =
  "HENT_ARBEIDSGIVEREPOSTINNHOLD_FEILET";

export const hentBekreftMoteArbeidsgiverEpostinnhold = (
  motedeltakerUuid,
  valgtAlternativId
) => {
  return {
    type: HENT_BEKREFT_MOTE_ARBEIDSGIVEREPOSTINNHOLD_FORESPURT,
    motedeltakerUuid,
    valgtAlternativId,
  };
};

export const henterArbeidstakerEpostInnhold = () => {
  return {
    type: HENTER_ARBEIDSGIVEREPOSTINNHOLD,
  };
};

export const arbeidsgiverEpostInnholdHentet = (eposttype, data) => {
  return {
    type: ARBEIDSGIVEREPOSTINNHOLD_HENTET,
    eposttype,
    data,
  };
};

export const hentArbeidsgiverEpostinnholdFeilet = () => {
  return {
    type: HENT_ARBEIDSGIVEREPOSTINNHOLD_FEILET,
  };
};
