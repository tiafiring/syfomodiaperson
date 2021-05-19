import { ArbeiderKvinneImage } from "../../../../../img/ImageComponents";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Veileder from "nav-frontend-veileder";
import { FlexColumn, FlexRow, ModalContentContainer } from "../../../Layout";
import { useFnrParam } from "../../../../hooks/useFnrParam";
import { useTrackButtonClick } from "../../../../data/logging/loggingHooks";

const ModalText = styled.div`
  max-width: 40ch;
`;

const texts = {
  nyttMote: "Nytt dialogmøte",
  nyttMoteTrackingContext: "Møtelandingsside: Opprett nytt dialogmøte",
  behandlerVaereMedTrackingContext:
    "Møtelandingsside: Modal behandler være med",
  behandlerVaereMed: "Skal behandleren være med i dialogmøtet?",
  nyLoesningInnkalling: "Ny løsning for innkalling til Dialogmøte",
  arbeiderBilde: "Bilde av arbeider",
  nei: "Nei",
  ja: "Ja",
  avbryt: "Avbryt",
  modalDM2Info:
    "Vi utvikler en ny løsning der du kan kalle inn til dialogmøte og skrive referat direkte i Modia.",
  modalOnskerDuProveTrackingContext:
    "Møtelandingsside: Modal ønsker du å prøve",
  modalOnskerDuProve: "Ønsker du å prøve ut den nye løsningen?",
};

export const NyttDialogMote = (): ReactElement => {
  const [behandlerModalIsOpen, setBehandlerModalIsOpen] = useState(false);
  const [nyLosningModalIsOpen, setNyLosningModalIsOpen] = useState(false);
  const history = useHistory();
  const fnr = useFnrParam();
  const trackButtonClick = useTrackButtonClick();

  return (
    <>
      <FlexRow>
        <Knapp
          onClick={() => {
            trackButtonClick(texts.nyttMote, texts.nyttMoteTrackingContext);
            setBehandlerModalIsOpen(true);
          }}
        >
          {texts.nyttMote}
        </Knapp>
      </FlexRow>

      <ModalWrapper
        isOpen={behandlerModalIsOpen}
        onRequestClose={() => setBehandlerModalIsOpen(false)}
        closeButton={true}
        contentLabel={texts.behandlerVaereMed}
        ariaHideApp={false}
      >
        <ModalContentContainer>
          <FlexRow>
            <h3>{texts.behandlerVaereMed}</h3>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  trackButtonClick(
                    texts.ja,
                    texts.behandlerVaereMedTrackingContext
                  );
                  setBehandlerModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/mote`);
                }}
              >
                {texts.ja}
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  trackButtonClick(
                    texts.nei,
                    texts.behandlerVaereMedTrackingContext
                  );
                  setBehandlerModalIsOpen(false);
                  setNyLosningModalIsOpen(true);
                }}
              >
                {texts.nei}
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Flatknapp
                onClick={() => {
                  trackButtonClick(
                    texts.avbryt,
                    texts.behandlerVaereMedTrackingContext
                  );
                  setBehandlerModalIsOpen(false);
                }}
              >
                {texts.avbryt}
              </Flatknapp>
            </FlexColumn>
          </FlexRow>
        </ModalContentContainer>
      </ModalWrapper>

      <ModalWrapper
        isOpen={nyLosningModalIsOpen}
        onRequestClose={() => setNyLosningModalIsOpen(false)}
        closeButton={true}
        contentLabel={texts.nyLoesningInnkalling}
        ariaHideApp={false}
      >
        <ModalContentContainer>
          <FlexRow>
            <Veileder
              center
              tekst={<ModalText>{texts.modalDM2Info}</ModalText>}
              posisjon="høyre"
            >
              <img alt={texts.arbeiderBilde} src={ArbeiderKvinneImage} />
            </Veileder>
          </FlexRow>

          <FlexRow>
            <h3>{texts.modalOnskerDuProve}</h3>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  trackButtonClick(
                    texts.ja,
                    texts.modalOnskerDuProveTrackingContext
                  );
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/dialogmote`);
                }}
              >
                {texts.ja}
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  trackButtonClick(
                    texts.nei,
                    texts.modalOnskerDuProveTrackingContext
                  );
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/mote`);
                }}
              >
                {texts.nei}
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Flatknapp
                onClick={() => {
                  trackButtonClick(
                    texts.avbryt,
                    texts.modalOnskerDuProveTrackingContext
                  );
                  setNyLosningModalIsOpen(false);
                }}
              >
                {texts.avbryt}
              </Flatknapp>
            </FlexColumn>
          </FlexRow>
        </ModalContentContainer>
      </ModalWrapper>
    </>
  );
};
