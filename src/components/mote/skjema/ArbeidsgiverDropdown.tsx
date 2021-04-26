import React from "react";
import { Select } from "nav-frontend-skjema";
import { Leder } from "../../../data/leder/ledere";

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
    {ledere
      .sort((a, b) => {
        if (a.navn > b.navn) {
          return 1;
        } else if (b.navn > a.navn) {
          return -1;
        }
        return 0;
      })
      .sort((a, b) => {
        if (a.organisasjonsnavn > b.organisasjonsnavn) {
          return 1;
        } else if (b.organisasjonsnavn > a.organisasjonsnavn) {
          return -1;
        }
        return 0;
      })
      .map((leder, idx) => (
        <option value={leder.orgnummer} key={idx}>
          {leder.organisasjonsnavn}
        </option>
      ))}
  </Select>
);

export default ArbeidsgiverDropdown;
