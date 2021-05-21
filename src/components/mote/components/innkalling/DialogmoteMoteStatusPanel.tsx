import {
  MotebehovIkkeSvartImage,
  MotebehovKanIkkeImage,
  MotebehovKanImage,
  MoteIkonBlaaImage,
} from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import React, { ReactElement } from "react";
import Alertstripe from "nav-frontend-alertstriper";
import { FlexColumn, FlexRow, PaddingSize } from "../../../Layout";
import { InfoRow } from "../../../InfoRow";
import { DialogmoteDTO } from "../../../../data/dialogmote/dialogmoteTypes";
import { useNavBrukerData } from "../../../../data/navbruker/navbruker_hooks";
import { Brukerinfo } from "../../../../data/navbruker/types/Brukerinfo";
import { tilDatoMedUkedagOgManedNavnOgKlokkeslett } from "../../../../utils/datoUtils";
import { useFnrParam } from "../../../../hooks/useFnrParam";
import { Link } from "react-router-dom";
import { TrackedKnapp } from "../../../buttons/TrackedKnapp";
import { TrackedHovedknapp } from "../../../buttons/TrackedHovedknapp";

const texts = {
  innkallingSendtTrackingContext: "Møtelandingsside: Sendt innkalling",
  header: "Innkallingen er sendt",
  infoMessage:
    "Du har brukt den nye løsningen i Modia. Her kan du også avlyse, endre tidspunktet, og skrive referat.",
  endreMote: "Endre møtet",
  avlysMote: "Avlys møtet",
  skrivReferat: "Skriv referat",
  naermesteLeder: "Nærmeste leder:",
  denSykmeldte: "Den sykmeldte:",
};

const subtitle = (dialogmote: DialogmoteDTO) => {
  const meetTimeText = tilDatoMedUkedagOgManedNavnOgKlokkeslett(dialogmote.tid);
  const videoText = dialogmote.videoLink ? " - Videomøte" : undefined;

  return `Møtetidspunkt: ${meetTimeText}${videoText}`;
};

const getIcon = (vilMote?: boolean): string => {
  switch (vilMote) {
    case true: {
      return MotebehovKanImage;
    }
    case false: {
      return MotebehovKanIkkeImage;
    }
    default: {
      return MotebehovIkkeSvartImage;
    }
  }
};

interface ParticipantProps {
  dialogmote: DialogmoteDTO;
  bruker: Brukerinfo;
}

const ParticipantInfo = ({
  dialogmote,
  bruker,
}: ParticipantProps): ReactElement => {
  return (
    <FlexColumn>
      <InfoRow
        icon={getIcon(true)}
        title={
          <span>
            <b>{texts.naermesteLeder}</b> {dialogmote.arbeidsgiver.lederNavn},
            avklar hva som skal vises her
          </span>
        }
      />
      <InfoRow
        icon={getIcon(false)}
        title={
          <span>
            <b>{texts.denSykmeldte}</b> {bruker.navn}, avklar hva som skal vises
            her
          </span>
        }
        topPadding={PaddingSize.SM}
      />
    </FlexColumn>
  );
};

interface Props {
  dialogmote: DialogmoteDTO;
}

export const DialogmoteMoteStatusPanel = ({ dialogmote }: Props) => {
  const bruker = useNavBrukerData();
  const fnr = useFnrParam();

  return (
    <DialogmotePanel
      icon={MoteIkonBlaaImage}
      header={texts.header}
      subtitle={subtitle(dialogmote)}
    >
      <FlexRow>
        <ParticipantInfo dialogmote={dialogmote} bruker={bruker} />
      </FlexRow>

      <FlexRow topPadding={PaddingSize.MD}>
        <Alertstripe type="advarsel">{texts.infoMessage}</Alertstripe>
      </FlexRow>

      <FlexRow topPadding={PaddingSize.MD}>
        <TrackedKnapp context={texts.innkallingSendtTrackingContext}>
          {texts.endreMote}
        </TrackedKnapp>
        <Link to={`/sykefravaer/${fnr}/dialogmote/${dialogmote.uuid}/avlys`}>
          <TrackedKnapp context={texts.innkallingSendtTrackingContext}>
            {texts.avlysMote}
          </TrackedKnapp>
        </Link>
        <TrackedHovedknapp context={texts.innkallingSendtTrackingContext}>
          {texts.skrivReferat}
        </TrackedHovedknapp>
      </FlexRow>
    </DialogmotePanel>
  );
};
