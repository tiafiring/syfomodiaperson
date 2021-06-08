import { Normaltekst, Undertekst, Undertittel } from "nav-frontend-typografi";
import { restdatoTildato } from "../../utils/datoUtils";
import VedtakAnnullertLabel from "./VedtakAnnullertLabel";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Panel from "nav-frontend-paneler";
import { useDispatch, useSelector } from "react-redux";
import { hentVirksomhet } from "../../data/virksomhet/virksomhet_actions";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { VedtakDTO } from "../../data/vedtak/vedtak";
import { navBlaLighten80, white } from "../../colors";

interface StyledPanelProps {
  readonly isActive: boolean;
}

const StyledPanel = styled(Panel)<StyledPanelProps>`
  background: ${(props) => (props.isActive ? navBlaLighten80 : white)};
`;

const StyledButton = styled.button`
  margin: 0;
  padding: 1em;
  border: 0;
  border-radius: 0;
  background: 0;
  width: 100%;
  text-align: left;
  background: none;
`;

const StyledEkspanderbartPanel = styled(Ekspanderbartpanel)`
  border-radius: 0;
  margin: 0 0 0.2em;
  padding: 0;
  background: none;
`;

const FlexRow = styled.div`
  display: flex;
`;

const FlexColInfo = styled.div`
  flex-grow: 1;
`;
const FlexColLabel = styled.div`
  flex-grow: 0;
`;

interface VedtakEkspanderbartPanelProps {
  selectedVedtak?: VedtakDTO;
  setSelectedVedtak: (vedtak: VedtakDTO) => void;
  vedtakPerArbeidsgiver: VedtakDTO[];
}

const VedtakEkspanderbartPanel = (
  panelProps: VedtakEkspanderbartPanelProps
) => {
  const {
    vedtakPerArbeidsgiver,
    setSelectedVedtak,
    selectedVedtak,
  } = panelProps;
  const dispatch = useDispatch();
  const virksomhetState = useSelector((state: any) => state.virksomhet);
  const [arbeidsgiver, setArbeidsgiver] = useState<string>("");
  const orgnr = vedtakPerArbeidsgiver[0].vedtak.organisasjonsnummer;

  useEffect(() => {
    if (orgnr) {
      dispatch(hentVirksomhet(orgnr));
    }
  }, []);

  useEffect(() => {
    if (virksomhetState[orgnr]?.hentet) {
      setArbeidsgiver(virksomhetState[orgnr].data[orgnr]);
    }
  }, [virksomhetState]);

  return (
    <StyledEkspanderbartPanel
      tittel={<Normaltekst>{arbeidsgiver}</Normaltekst>}
    >
      {vedtakPerArbeidsgiver.map((v: VedtakDTO, index: number) => {
        return (
          <StyledPanel key={index} isActive={v.id === selectedVedtak?.id}>
            <StyledButton
              onClick={() => {
                setSelectedVedtak(v);
              }}
            >
              <FlexRow>
                <FlexColInfo>
                  <Undertittel>
                    {`${restdatoTildato(v.vedtak.fom)} - ${restdatoTildato(
                      v.vedtak.tom
                    )}`}
                  </Undertittel>
                  <Undertekst>
                    {`Utbetaling: ${restdatoTildato(
                      v.opprettet
                    )} · Restdager: ${v.vedtak.gjenståendeSykedager}`}
                  </Undertekst>
                </FlexColInfo>
                {v.annullert && (
                  <FlexColLabel>
                    <VedtakAnnullertLabel />
                  </FlexColLabel>
                )}
              </FlexRow>
            </StyledButton>
          </StyledPanel>
        );
      })}
    </StyledEkspanderbartPanel>
  );
};

export default VedtakEkspanderbartPanel;
