import React, { ReactElement } from "react";
import { Radio, RadioGruppe } from "nav-frontend-skjema";
import styled from "styled-components";
import { BehandlerDTO } from "@/data/behandler/BehandlerDTO";
import { capitalizeWord } from "@/utils/stringUtils";

const texts = {
  behandlerLegend: "Behandler som inviteres til dialogmøtet",
  behandlerInfoPlural:
    "Behandleren vil få en dialogmelding med invitasjon. Dersom du ønsker å invitere en annen behandler " +
    "enn de som står oppgitt her, må du fortsatt sende innkallingen fra Arena.",
  behandlerInfo:
    "Behandleren vil få en dialogmelding med invitasjon. Dersom du ønsker å invitere en annen behandler " +
    "enn den som står oppgitt her, må du fortsatt sende innkallingen fra Arena.",
  noBehandler: "Ingen behandler",
};

const behandlerOneliner = (behandler: BehandlerDTO): string => {
  const name = [behandler.fornavn, behandler.mellomnavn, behandler.etternavn]
    .filter(Boolean)
    .join(" ");
  const typeAndName = `${capitalizeWord(behandler.type)}: ${name}`;
  const office = !!behandler.kontor ? capitalizeWord(behandler.kontor) : "";
  const phone = !!behandler.telefon ? `tlf ${behandler.telefon}` : "";

  return [typeAndName, office, phone].filter(Boolean).join(", ");
};

export const StyledRadioGruppe = styled(RadioGruppe)`
  margin-bottom: 1em;
`;

interface BehandlerRadioGruppeProps {
  behandlere: BehandlerDTO[];
  setSelectedBehandler: (behandler?: BehandlerDTO) => void;
}

const BehandlerRadioGruppe = ({
  behandlere,
  setSelectedBehandler,
}: BehandlerRadioGruppeProps): ReactElement => {
  return (
    <>
      <StyledRadioGruppe id={"behandlerId"} legend={texts.behandlerLegend}>
        <Radio
          label={texts.noBehandler}
          name="behandler"
          onChange={() => setSelectedBehandler(undefined)}
        />
        {behandlere.map((behandler, index) => (
          <Radio
            label={behandlerOneliner(behandler)}
            name="behandler"
            key={index}
            onChange={() => setSelectedBehandler(behandler)}
          />
        ))}
      </StyledRadioGruppe>
      {behandlere.length > 1 ? (
        <p>{texts.behandlerInfoPlural}</p>
      ) : (
        <p>{texts.behandlerInfo}</p>
      )}
    </>
  );
};

export default BehandlerRadioGruppe;
