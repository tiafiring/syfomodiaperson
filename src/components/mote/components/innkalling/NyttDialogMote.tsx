import { ArbeiderKvinneImage } from "../../../../../img/ImageComponents";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Veileder from "nav-frontend-veileder";
import { FlexColumn, FlexRow, ModalContentContainer } from "../../../Layout";
import { erLokalEllerPreprod } from "../../../../utils/miljoUtil";
import { useFnrParam } from "../../../../hooks/useFnrParam";

const ModalText = styled.div`
  max-width: 40ch;
`;

const texts = {
  nyttMote: "Nytt dialogmøte",
  behandlerVaereMed: "Skal behandleren være med i dialogmøtet?",
  nyLoesningInnkalling: "Ny løsning for innkalling til Dialogmøte",
  arbeiderBilde: "Bilde av arbeider",
  nei: "Nei",
  ja: "Ja",
  avbryt: "Avbryt",
  modalDM2Info:
    "Vi utvikler en ny løsning der du kan kalle inn til dialogmøte og skrive referat direkte i Modia.",
  modalOnskerDuProve: "Ønsker du å prøve ut den nye løsningen?",
};

export const NyttDialogMote = (): ReactElement => {
  const [behandlerModalIsOpen, setBehandlerModalIsOpen] = useState(false);
  const [nyLosningModalIsOpen, setNyLosningModalIsOpen] = useState(false);
  const history = useHistory();
  const fnr = useFnrParam();

  const Moteplanleggeren = (
    <FlexRow>
      <Knapp
        onClick={() => {
          history.push(`/sykefravaer/${fnr}/mote`);
        }}
      >
        {texts.nyttMote}
      </Knapp>
    </FlexRow>
  );

  const DialogmoteInnkalling = (
    <>
      <FlexRow>
        <Knapp onClick={() => setBehandlerModalIsOpen(true)}>
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
                  setBehandlerModalIsOpen(false);
                  setNyLosningModalIsOpen(true);
                }}
              >
                {texts.nei}
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Flatknapp onClick={() => setBehandlerModalIsOpen(false)}>
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
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/mote`);
                }}
              >
                {texts.nei}
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Flatknapp onClick={() => setNyLosningModalIsOpen(false)}>
                {texts.avbryt}
              </Flatknapp>
            </FlexColumn>
          </FlexRow>
        </ModalContentContainer>
      </ModalWrapper>
    </>
  );

  return erLokalEllerPreprod ? DialogmoteInnkalling : Moteplanleggeren;
};
