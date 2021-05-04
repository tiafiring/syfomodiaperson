import {
  MotebehovIkkeSvartImage,
  MotebehovKanIkkeImage,
  MotebehovKanImage,
  MoteIkonBlaaImage,
} from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import React, { ReactElement } from "react";
import Alertstripe from "nav-frontend-alertstriper";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { FlexColumn, FlexRow, PaddingSize } from "../../../Layout";
import { InfoRow } from "../../../InfoRow";

const texts = {
  header: "Innkallingen er sendt",
  infoMessage:
    "Du har brukt den nye løsningen i Modia. Her kan du også avlyse, endre tidspunktet og skrive referat.",
  endreMote: "Endre møtet",
  avlysMote: "Avlys møtet",
  skrivReferat: "Skriv referat",
  naermesteLeder: "Nærmeste leder:",
  denSykmeldte: "Den sykmeldte:",
};

const subtitle = () => {
  return "Møtetidspunkt: Mandag 30. april 2021 kl 09.00 - Videomøte"; //TODO
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

const ParticipantInfo = (): ReactElement => {
  const detailTextArbeidstaker = "Jeg er til behandling den dagen";
  const detailTextArbeidsgiver = "Pina d grett";

  return (
    <FlexColumn>
      <InfoRow
        icon={getIcon(true)}
        title={
          <span>
            <b>{texts.naermesteLeder}</b> Grønn Bamse, vil møte opp
          </span>
        }
        subtitle={detailTextArbeidsgiver}
      />
      <InfoRow
        icon={getIcon(false)}
        title={
          <span>
            <b>{texts.denSykmeldte}</b> Artig Trane, ønsker endret dato
          </span>
        }
        subtitle={detailTextArbeidstaker}
        topPadding={PaddingSize.SM}
      />
    </FlexColumn>
  );
};

export const DialogmoteMoteStatusPanel = () => {
  return (
    <DialogmotePanel
      icon={MoteIkonBlaaImage}
      header={texts.header}
      subtitle={subtitle()}
    >
      <FlexRow>
        <ParticipantInfo />
      </FlexRow>

      <FlexRow topPadding={PaddingSize.MD}>
        <Alertstripe type="advarsel">{texts.infoMessage}</Alertstripe>
      </FlexRow>

      <FlexRow topPadding={PaddingSize.MD}>
        <Knapp>{texts.endreMote}</Knapp>
        <Knapp>{texts.avlysMote}</Knapp>
        <Hovedknapp>{texts.skrivReferat}</Hovedknapp>
      </FlexRow>
    </DialogmotePanel>
  );
};
