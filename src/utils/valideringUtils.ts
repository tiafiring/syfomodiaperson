import { MAX_LENGTH_STED } from "../components/mote/skjema/MotebookingSkjema";
import { isISODateString } from "nav-datovelger";

interface TidspunktFeil {
  klokkeslett?: string;
  dato?: string;
}

interface Tidspunkt {
  klokkeslett?: string;
  dato?: string;
}

const texts = {
  dateMissing: "Vennligst angi dato",
  dateWrongFormat: "Vennligst angi riktig datoformat; dd.mm.åååå",
  timeMissing: "Vennligst angi klokkeslett",
  placeMissing: "Vennligst angi møtested",
  placeTooLong: `Maks ${MAX_LENGTH_STED} tegn tillatt`,
  orgMissing: "Vennligst velg arbeidsgiver",
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

export const validerTidspunkt = (tidspunkt?: Tidspunkt): TidspunktFeil => {
  const feil: TidspunktFeil = {};
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
