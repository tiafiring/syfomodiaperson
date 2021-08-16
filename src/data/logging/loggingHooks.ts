import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../rootState";
import { trackEvent, UserProperties } from "@/amplitude/amplitude";

export const texts = {
  click: "Klikker på:",
  pageLoad: "Laster side",
};

export interface loggingMetadata {
  team: string;
  app: string;
  behandlendeEnhetId: string;
  behandlendeEnhetNavn: string;
}

export const useHasLoadedMetaData = (): boolean => {
  const harHentetBehandlendeEnhet = useSelector(
    (state: RootState) => !!state.behandlendeEnhet.data.enhetId
  );
  const harHentetValgtEnhet = useSelector(
    (state: RootState) => !!state.enhet.valgtEnhet
  );
  return harHentetBehandlendeEnhet && harHentetValgtEnhet;
};

export const useLoggingMetaData = (): loggingMetadata => {
  const behandlendeEnhet = useSelector(
    (state: RootState) => state.behandlendeEnhet.data
  );

  return {
    team: "iSyfo",
    app: "Syfomodiaperson",
    behandlendeEnhetId: behandlendeEnhet.enhetId,
    behandlendeEnhetNavn: behandlendeEnhet.navn,
  };
};

export const useUserProperties = (): UserProperties => {
  const valgtEnhet = useSelector((state: RootState) => state.enhet.valgtEnhet);

  return {
    valgtEnhet: valgtEnhet,
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

export const useTrackOnClick = () => {
  const trackEvent = useTrackEvent();

  return function (elementName: string, kontekst?: string) {
    const context = kontekst && { kontekst: kontekst };
    trackEvent(`${texts.click} ${elementName}`, {
      pageName: document.title,
      ...context,
    });
  };
};

export const useTrackPageLoad = () => {
  const trackEvent = useTrackEvent();

  return function (pageName: string, aktivtMenyPunkt: string) {
    trackEvent(`${texts.pageLoad}`, {
      aktivtMenyPunkt: aktivtMenyPunkt,
      pageName: pageName,
    });
  };
};
