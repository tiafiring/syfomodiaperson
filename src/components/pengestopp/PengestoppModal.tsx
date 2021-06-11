import * as React from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import ModalWrapper from "nav-frontend-modal";
import { Knapp } from "nav-frontend-knapper";
import { Systemtittel, Feilmelding } from "nav-frontend-typografi";
import { Checkbox, CheckboxGruppe } from "nav-frontend-skjema";
import styled from "styled-components";
import {
  Arbeidsgiver,
  StoppAutomatikk,
  SykepengestoppArsak,
  SykepengestoppArsakType,
  VirksomhetNr,
} from "../../data/pengestopp/types/FlaggPerson";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { useSelector, useDispatch } from "react-redux";
import { endreStatus } from "../../data/pengestopp/flaggperson_actions";
import { FlaggpersonState } from "../../data/pengestopp/flaggperson";
import { useNavEnhet } from "../../hooks/useNavEnhet";
import { useValgtPersonident } from "../../hooks/useValgtBruker";

const texts = {
  notStoppedTittel:
    "Send beskjed til NAV Arbeid og ytelser om mulig stans av sykepenger",
  stoppedTittel: "Beskjeden din er sendt",
  stoppedInfo:
    "Nå har du sendt beskjed til NAV Arbeid og ytelser. Du må også lage et notat i Gosys hvor du begrunner hvorfor du mener sykepengene bør stanses.",
  seServicerutinen: "Se servicerutinen hvis du er i tvil.",
  arbeidsgiver: "Velg arbeidsgiver",
  stansSykepenger: "Stans sykepenger",
  send: "Send",
  avbryt: "Avbryt",
  submitError: "Du må velge minst én arbeidsgiver",
  serverError:
    "Det er ikke mulig å stoppe automatisk utbetaling av sykepenger akkurat nå. Prøv igjen senere.",
  arsak: {
    title: "Du må velge minst en årsak",
    submitError: "Du må velge minst en årsak",
  },
};

interface IPengestoppModal {
  isOpen: boolean;
  arbeidsgivere: Arbeidsgiver[];

  toggle(): void;
}

interface SykepengestoppArsakTekst {
  type: SykepengestoppArsakType;
  text: string;
}

export const sykepengestoppArsakTekstListe: SykepengestoppArsakTekst[] = [
  {
    type: SykepengestoppArsakType.BESTRIDELSE_SYKMELDING,
    text: "Bestridelse av sykmelding (§ 8-4 første ledd)",
  },
  {
    type: SykepengestoppArsakType.MEDISINSK_VILKAR,
    text: "Medisinsk vilkår (§ 8-4 første ledd)",
  },
  {
    type: SykepengestoppArsakType.AKTIVITETSKRAV,
    text: "Aktivitetskravet (§ 8-4 andre ledd)",
  },
  {
    type: SykepengestoppArsakType.TILBAKEDATERT_SYKMELDING,
    text: "Tilbakedatert sykmelding (§ 8-7)",
  },
  {
    type: SykepengestoppArsakType.MANGLENDE_MEDVIRKING,
    text: "Manglende medvirkning (§ 8-8)",
  },
];

const Modal = styled(ModalWrapper)`
  padding: 2em 2.5em;
  max-width: 50em;
  width: 100%;
`;

const Group = styled.div`
  margin: 1rem 0;
`;

const BottomGroup = styled.div`
  margin-top: 1em;
`;

const tittel = (stopped: boolean) => {
  return stopped ? texts.stoppedTittel : texts.notStoppedTittel;
};

const PengestoppModal = ({
  isOpen,
  arbeidsgivere,
  toggle,
}: IPengestoppModal) => {
  const navEnhet = useNavEnhet();
  const flaggperson: FlaggpersonState = useSelector(
    (state: any) => state.flaggperson
  );

  const dispatch = useDispatch();

  const [stopped, setStopped] = useState(false);
  const [selected, setSelected] = useState<VirksomhetNr[]>([]);
  const [selectedArsakList, setSelectedArsakList] = useState<
    SykepengestoppArsak[]
  >([]);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [submitErrorArsak, setSubmitErrorArsak] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const fnr = useValgtPersonident();
  const [stoppAutomatikk, setStoppAutomatikk] = useState<StoppAutomatikk>({
    sykmeldtFnr: { value: fnr },
    arsakList: [],
    virksomhetNr: [],
    enhetNr: { value: navEnhet },
  });

  useEffect(() => {
    setStoppAutomatikk({ ...stoppAutomatikk, virksomhetNr: selected });
  }, [selected]);

  useEffect(() => {
    setStoppAutomatikk({ ...stoppAutomatikk, arsakList: selectedArsakList });
  }, [selectedArsakList]);

  useEffect(() => {
    if (
      flaggperson.endret &&
      !flaggperson.endrer &&
      !flaggperson.endringFeilet
    ) {
      setStopped(true);
    } else if (
      !flaggperson.endret &&
      !flaggperson.endrer &&
      flaggperson.endringFeilet
    ) {
      setServerError(true);
    }
  }, [flaggperson]);

  const handleStoppAutomatikkButtonPress = () => {
    if (stoppAutomatikk.virksomhetNr.length <= 0) {
      setSubmitError(true);
    } else if (stoppAutomatikk.arsakList.length <= 0) {
      setSubmitErrorArsak(true);
    } else {
      dispatch(endreStatus(stoppAutomatikk));
    }
  };

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const orgnr: VirksomhetNr = {
      value: (event.target as HTMLInputElement).name,
    };
    const { checked } = event.target as HTMLInputElement;

    if (checked) {
      setSubmitError(false);
      setSelected([...selected, orgnr]);
    } else {
      const filtered = selected.filter((virksomhetNr: VirksomhetNr) => {
        return virksomhetNr.value !== orgnr.value;
      });
      setSelected(filtered);
    }
  };

  const handleChangeArsak = (event: SyntheticEvent<HTMLInputElement>) => {
    const newArsakType: SykepengestoppArsakType =
      SykepengestoppArsakType[(event.target as HTMLInputElement).name];
    const newArsak = { type: newArsakType };
    const { checked } = event.target as HTMLInputElement;

    if (checked) {
      setSubmitErrorArsak(false);
      setSelectedArsakList([...selectedArsakList, newArsak]);
    } else {
      const filtered = selectedArsakList.filter(
        (arsak: SykepengestoppArsak) => {
          return newArsak.type !== arsak.type;
        }
      );
      setSelectedArsakList(filtered);
    }
  };

  const handleCloseModal = () => {
    setSelected([]);
    toggle();
  };

  return (
    <Modal
      contentLabel={texts.stansSykepenger}
      isOpen={isOpen}
      closeButton={true}
      ariaHideApp={false}
      onRequestClose={() => {
        handleCloseModal();
        setStopped(false);
      }}
    >
      <Systemtittel>{tittel(stopped)}</Systemtittel>

      {!stopped ? (
        <>
          <Group>
            <CheckboxGruppe
              legend={texts.arbeidsgiver}
              feil={submitError && texts.submitError}
            >
              {arbeidsgivere.map(
                (arbeidsgiver: Arbeidsgiver, index: number) => {
                  return (
                    <Checkbox
                      key={index}
                      label={arbeidsgiver.navn}
                      onChange={handleChange}
                      name={arbeidsgiver.orgnummer}
                    />
                  );
                }
              )}
            </CheckboxGruppe>
          </Group>
          <Group>
            <CheckboxGruppe
              legend={texts.arsak.title}
              feil={submitErrorArsak && texts.arsak.submitError}
            >
              {sykepengestoppArsakTekstListe.map((arsak, index: number) => {
                return (
                  <Checkbox
                    key={index}
                    label={arsak.text}
                    onChange={handleChangeArsak}
                    name={arsak.type}
                  />
                );
              })}
            </CheckboxGruppe>
          </Group>
          <Knapp type="flat" onClick={handleCloseModal}>
            {texts.avbryt}
          </Knapp>
          <Knapp
            type="hoved"
            mini
            spinner={flaggperson.endrer}
            disabled={flaggperson.endrer}
            onClick={handleStoppAutomatikkButtonPress}
          >
            {texts.send}
          </Knapp>
        </>
      ) : (
        <>
          <Group>
            <AlertStripeInfo>
              <p>{texts.stoppedInfo}</p>
              <p>{texts.seServicerutinen}</p>
            </AlertStripeInfo>
          </Group>
        </>
      )}
      {serverError && (
        <BottomGroup>
          <Feilmelding>{texts.serverError}</Feilmelding>
        </BottomGroup>
      )}
    </Modal>
  );
};

export default PengestoppModal;
