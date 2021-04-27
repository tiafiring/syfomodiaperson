import { ArbeiderKvinneImage } from "../../../../../img/ImageComponents";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import Veileder from "nav-frontend-veileder";
import { FlexColumn, FlexRow, ModalContentContainer } from "../../../Layout";
import { erLokalEllerPreprod } from "../../../../utils/miljoUtil";

const ModalText = styled.div`
  max-width: 40ch;
`;

export const NyttDialogMote = (): ReactElement => {
  const [behandlerModalIsOpen, setBehandlerModalIsOpen] = useState(false);
  const [nyLosningModalIsOpen, setNyLosningModalIsOpen] = useState(false);
  const history = useHistory();
  const { fnr } = useParams();

  const dm1 = (
    <FlexRow>
      <Knapp
        onClick={() => {
          history.push(`/sykefravaer/${fnr}/mote`);
        }}
      >
        Nytt dialogmøte
      </Knapp>
    </FlexRow>
  );

  const dm2 = (
    <>
      <FlexRow>
        <Knapp onClick={() => setBehandlerModalIsOpen(true)}>
          Nytt dialogmøte
        </Knapp>
      </FlexRow>

      <ModalWrapper
        isOpen={behandlerModalIsOpen}
        onRequestClose={() => setBehandlerModalIsOpen(false)}
        closeButton={true}
        contentLabel="Skal behandler være med"
        ariaHideApp={false}
      >
        <ModalContentContainer>
          <FlexRow>
            <h3>Skal behandleren være med i dialogmøtet?</h3>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  setBehandlerModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/mote`);
                }}
              >
                Ja
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  setBehandlerModalIsOpen(false);
                  setNyLosningModalIsOpen(true);
                }}
              >
                Nei
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Flatknapp onClick={() => setBehandlerModalIsOpen(false)}>
                Avbryt
              </Flatknapp>
            </FlexColumn>
          </FlexRow>
        </ModalContentContainer>
      </ModalWrapper>

      <ModalWrapper
        isOpen={nyLosningModalIsOpen}
        onRequestClose={() => setNyLosningModalIsOpen(false)}
        closeButton={true}
        contentLabel="Ny løsning for innkalling til Dialogmøte"
        ariaHideApp={false}
      >
        <ModalContentContainer>
          <FlexRow>
            <Veileder
              center
              tekst={
                <ModalText>
                  Vi utvikler en ny løsning der du kan kalle inn til dialogmøte
                  og skrive referat direkte i Modia.
                </ModalText>
              }
              posisjon="høyre"
            >
              <img alt="Bilde av arbeider" src={ArbeiderKvinneImage} />
            </Veileder>
          </FlexRow>

          <FlexRow>
            <h3>Ønsker du å prøve ut den nye løsningen?</h3>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/dialogmote`);
                }}
              >
                Ja
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Knapp
                onClick={() => {
                  setNyLosningModalIsOpen(false);
                  history.push(`/sykefravaer/${fnr}/mote`);
                }}
              >
                Nei
              </Knapp>
            </FlexColumn>
            <FlexColumn>
              <Flatknapp onClick={() => setNyLosningModalIsOpen(false)}>
                Avbryt
              </Flatknapp>
            </FlexColumn>
          </FlexRow>
        </ModalContentContainer>
      </ModalWrapper>
    </>
  );

  return erLokalEllerPreprod ? dm2 : dm1;
};
