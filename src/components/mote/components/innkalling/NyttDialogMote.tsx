import { ArbeiderKvinneImage } from "../../../../../img/ImageComponents";
import ModalWrapper from "nav-frontend-modal";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Veileder from "nav-frontend-veileder";
import { FlexColumn, FlexRow, ModalContentContainer } from "../../../Layout";
import { TrackedKnapp } from "../../../buttons/TrackedKnapp";
import { TrackedFlatknapp } from "../../../buttons/TrackedFlatknapp";

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

  return (
    <>
      <FlexRow>
        <TrackedKnapp
          data-cy="nyttDM2Mote"
          context={texts.nyttMoteTrackingContext}
          onClick={() => {
            setBehandlerModalIsOpen(true);
          }}
        >
          {texts.nyttMote}
        </TrackedKnapp>
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
              <TrackedKnapp
                context={texts.behandlerVaereMedTrackingContext}
                onClick={() => {
                  setBehandlerModalIsOpen(false);
                  history.push(`/sykefravaer/mote`);
                }}
              >
                {texts.ja}
              </TrackedKnapp>
            </FlexColumn>
            <FlexColumn>
              <TrackedKnapp
                context={texts.behandlerVaereMedTrackingContext}
                onClick={() => {
                  setBehandlerModalIsOpen(false);
                  setNyLosningModalIsOpen(true);
                }}
              >
                {texts.nei}
              </TrackedKnapp>
            </FlexColumn>
            <FlexColumn>
              <TrackedFlatknapp
                context={texts.behandlerVaereMedTrackingContext}
                onClick={() => {
                  setBehandlerModalIsOpen(false);
                }}
              >
                {texts.avbryt}
              </TrackedFlatknapp>
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
              <TrackedKnapp
                context={texts.modalOnskerDuProveTrackingContext}
                onClick={() => {
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/dialogmote`);
                }}
              >
                {texts.ja}
              </TrackedKnapp>
            </FlexColumn>
            <FlexColumn>
              <TrackedKnapp
                context={texts.modalOnskerDuProveTrackingContext}
                onClick={() => {
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/mote`);
                }}
              >
                {texts.nei}
              </TrackedKnapp>
            </FlexColumn>
            <FlexColumn>
              <TrackedFlatknapp
                context={texts.modalOnskerDuProveTrackingContext}
                onClick={() => {
                  setNyLosningModalIsOpen(false);
                }}
              >
                {texts.avbryt}
              </TrackedFlatknapp>
            </FlexColumn>
          </FlexRow>
        </ModalContentContainer>
      </ModalWrapper>
    </>
  );
};
