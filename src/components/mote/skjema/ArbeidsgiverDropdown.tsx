import React from "react";
import { Select } from "nav-frontend-skjema";
import { Leder } from "../../../data/leder/ledere";
import { ledereSortertPaaNavnOgOrganisasjonsnavn } from "../../../utils/ledereUtils";

const texts = {
  chooseArbeidsgiver: "Velg arbeidsgiver",
};

interface ArbeidsgiverDropdownProps {
  velgArbeidsgiver(orgNr: string): void;

  ledere: Leder[];
  label?: string;
}

const ArbeidsgiverDropdown = ({
  velgArbeidsgiver,
  ledere,
  label,
}: ArbeidsgiverDropdownProps) => (
  <Select
    label={label}
    onChange={(e) => {
      velgArbeidsgiver(e.target.value);
    }}
  >
    <option value="VELG">{texts.chooseArbeidsgiver}</option>
    {ledereSortertPaaNavnOgOrganisasjonsnavn(ledere).map((leder, idx) => (
      <option value={leder.orgnummer} key={idx}>
        {leder.organisasjonsnavn}
      </option>
    ))}
  </Select>
);

export default ArbeidsgiverDropdown;
