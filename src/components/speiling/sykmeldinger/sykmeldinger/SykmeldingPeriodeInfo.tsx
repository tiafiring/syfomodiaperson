import React from "react";
import { getDuration } from "../../../../utils/datoUtils";
import { SykmeldingPeriodeDTO } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import { capitalizeFoersteBokstav } from "../../../../utils/stringUtils";

const textBehandlingsdagEnDag = (behandlingsdager: number, dager: number) => {
  return `${behandlingsdager} behandlingsdag i løpet av ${dager} dag\n`;
};

const textBehandlingsdager = (behandlingsdager: number, dager: number) => {
  return `${behandlingsdager} behandlingsdager i løpet av ${dager} dager\n`;
};

const textEnDagIngenGrad = (behandlingsdager: number) => {
  return `${behandlingsdager} behandlingsdager\n`;
};

const textReisetilskuddEnDag = (dager: number) => {
  return `Reisetilskudd i ${dager} dag\n`;
};

const textReisetilskudd = (dager: number) => {
  return `Reisetilskudd i ${dager} dager\n`;
};

const textReisetilskuddGradert = (grad: number, dager: number) => {
  return `${grad} % sykmelding med reisetilskudd i ${dager} dager\n`;
};

const textAvventende = (arbeidsgiver: string, dager: number) => {
  return `Avventende sykmelding fra ${arbeidsgiver} i ${dager} dager`;
};

const textAvventendeEnDag = (arbeidsgiver: string, dager: number) => {
  return `Avventende sykmelding fra ${arbeidsgiver} i ${dager} dag`;
};

const textAvventendeEnDagUtenArbeidsgiver = (dager: number) => {
  return `Avventende sykemelding i ${dager} dag\n`;
};

const textAvventendeUtenArbeidsgiver = (dager: number) => {
  return `Avventende sykemelding i ${dager} dager\n`;
};

const textDefaultArbeidsgiver = (arbeidsgiver?: string) => {
  return arbeidsgiver ? ` sykmeldt fra ${arbeidsgiver}` : "";
};

const textDefaultDager = (dager: number) => {
  return dager === 1 ? ` i ${dager} dag` : ` i ${dager} dager`;
};

const textDefault = (dager: number, arbeidsgiver?: string, grad?: number) => {
  const textArbeidsgiver = textDefaultArbeidsgiver(arbeidsgiver);
  const textDager = textDefaultDager(dager);
  const text = `${textArbeidsgiver}${textDager}`;
  return grad ? `${grad} %${text}` : `${capitalizeFoersteBokstav(text.trim())}`;
};

interface SykmeldingPeriodeInfoProps {
  periode: SykmeldingPeriodeDTO;
  arbeidsgiver?: string;
  Element?: keyof JSX.IntrinsicElements;
}

const SykmeldingPeriodeInfo = ({
  periode,
  arbeidsgiver,
  Element = "p",
}: SykmeldingPeriodeInfoProps) => {
  const antallDager = getDuration(periode.fom, periode.tom);
  const sykmeldtEnDag = antallDager === 1;
  const sykmeldtEnDagIngenGrad = sykmeldtEnDag && periode.grad === undefined;

  let text = textDefault(antallDager, arbeidsgiver, periode.grad);

  if (periode.behandlingsdager === 1 && sykmeldtEnDagIngenGrad) {
    text = textBehandlingsdagEnDag(periode.behandlingsdager, antallDager);
  }

  if (periode.behandlingsdager && periode.behandlingsdager > 1) {
    text = textBehandlingsdager(periode.behandlingsdager, antallDager);

    if (sykmeldtEnDagIngenGrad) {
      text = textEnDagIngenGrad(periode.behandlingsdager);
    }
  }

  if (periode.reisetilskudd) {
    text = textReisetilskudd(antallDager);

    if (sykmeldtEnDag) {
      text = textReisetilskuddEnDag(antallDager);
    }

    if (periode.grad && periode.grad !== 100) {
      text = textReisetilskuddGradert(periode.grad, antallDager);
    }
  }

  if (periode.avventende) {
    if (arbeidsgiver === undefined) {
      text = sykmeldtEnDag
        ? textAvventendeEnDagUtenArbeidsgiver(antallDager)
        : textAvventendeUtenArbeidsgiver(antallDager);
    } else {
      text = sykmeldtEnDag
        ? textAvventendeEnDag(arbeidsgiver, antallDager)
        : textAvventende(arbeidsgiver, antallDager);
    }
  }

  return <Element className="js-periode">{text}</Element>;
};

export default SykmeldingPeriodeInfo;
