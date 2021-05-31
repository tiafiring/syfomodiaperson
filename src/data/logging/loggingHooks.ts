import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../rootState";
import { trackEvent } from "../../amplitude/amplitude";

export const texts = {
  buttonClick: "Klikker på:",
  pageLoad: "Laster side",
};

export interface loggingMetadata {
  team: string;
  app: string;
  valgEnhetId: string;
  behandlendeEnhetId: string;
  behandlendeEnhetNavn: string;
}

export const useLoggingMetaData = (): loggingMetadata => {
  const valgEnhetId = useSelector((state: RootState) => state.enhet.valgtEnhet);
  const behandlendeEnhet = useSelector(
    (state: RootState) => state.behandlendeEnhet.data
  );

  return {
    team: "iSyfo",
    app: "Syfomodiaperson",
    valgEnhetId: valgEnhetId,
    behandlendeEnhetId: behandlendeEnhet.enhetId,
    behandlendeEnhetNavn: behandlendeEnhet.navn,
  };
};

export const useTrackEvent = () => {
  const metaData = useLoggingMetaData();

  return useCallback(
    function (eventName: string, eventData?: Record<string, string>) {
      trackEvent(eventName, Object.assign({}, metaData, eventData));
    },
    [metaData]
  );
};

export const useTrackButtonClick = () => {
  const trackEvent = useTrackEvent();

  return function (buttonName: string, kontekst: string) {
    trackEvent(`${texts.buttonClick} ${buttonName}`, { kontekst: kontekst });
  };
};

export const useTrackPageLoad = () => {
  const trackEvent = useTrackEvent();

  return function (pageName: string, aktivtMenyPunkt: string) {
    trackEvent(`${texts.pageLoad}`, {
      aktivtMenyPunkt: aktivtMenyPunkt,
      pageName: pageName
    });
  };
};
