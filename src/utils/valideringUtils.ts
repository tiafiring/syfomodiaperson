import { MAX_LENGTH_STED } from "../components/mote/skjema/MotebookingSkjema";
import { isISODateString } from "nav-datovelger";

interface Tidspunkt {
  klokkeslett?: string;
  dato?: string;
}

interface Begrunnelser {
  begrunnelseArbeidstaker?: string;
  begrunnelseArbeidsgiver?: string;
}

export const texts = {
  dateMissing: "Vennligst angi dato",
  dateWrongFormat: "Vennligst angi riktig datoformat; dd.mm.åååå",
  timeMissing: "Vennligst angi klokkeslett",
  placeMissing: "Vennligst angi møtested",
  placeTooLong: `Maks ${MAX_LENGTH_STED} tegn tillatt`,
  orgMissing: "Vennligst velg arbeidsgiver",
  begrunnelseArbeidstakerMissing:
    "Vennligst angi begrunnelse til arbeidstakeren",
  begrunnelseArbeidsgiverMissing:
    "Vennligst angi begrunnelse til nærmeste leder",
};

export const validerArbeidsgiver = (orgNummer?: string): string | undefined => {
  if (!orgNummer || orgNummer === "VELG") {
    return texts.orgMissing;
  }
  return undefined;
};

export const validerSted = (
  sted?: string,
  maxLength?: number
): string | undefined => {
  if (!sted || sted.trim() === "") {
    return texts.placeMissing;
  } else if (maxLength && sted.length > maxLength) {
    return texts.placeTooLong;
  } else {
    return undefined;
  }
};

export const validerTidspunkt = (tidspunkt?: Tidspunkt): Partial<Tidspunkt> => {
  const feil: Partial<Tidspunkt> = {};
  if (!tidspunkt) {
    feil.klokkeslett = texts.timeMissing;
    feil.dato = texts.dateMissing;
  } else {
    const datoValue = tidspunkt.dato;
    if (!datoValue) {
      feil.dato = texts.dateMissing;
    } else if (!isISODateString(datoValue)) {
      feil.dato = texts.dateWrongFormat;
    }
    const klokkeslettValue = tidspunkt.klokkeslett;
    if (!klokkeslettValue) {
      feil.klokkeslett = texts.timeMissing;
    }
  }

  return feil;
};

export const validerBegrunnelser = (
  begrunnelser: Begrunnelser
): Partial<Begrunnelser> => {
  const { begrunnelseArbeidstaker, begrunnelseArbeidsgiver } = begrunnelser;
  const feil: Partial<Begrunnelser> = {};
  if (!begrunnelseArbeidstaker || begrunnelseArbeidstaker.trim() === "") {
    feil.begrunnelseArbeidstaker = texts.begrunnelseArbeidstakerMissing;
  }
  if (!begrunnelseArbeidsgiver || begrunnelseArbeidsgiver.trim() === "") {
    feil.begrunnelseArbeidsgiver = texts.begrunnelseArbeidsgiverMissing;
  }

  return feil;
};
