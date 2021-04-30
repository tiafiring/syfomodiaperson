import { Error403 } from "./errors";
import { erProd } from "../utils/miljoUtil";

export const NAV_CONSUMER_ID_HEADER = "nav-consumer-id";
export const NAV_CONSUMER_ID = "syfomodiaperson";
export const NAV_PERSONIDENT_HEADER = "nav-personident";

const log = (...data: unknown[]): void => {
  if (
    window.location.search.indexOf("log=true") > -1 ||
    process.env.NODE_ENV === "development"
  ) {
    console.log(data);
  }
};

export const hentLoginUrl = (): string => {
  if (erProd()) {
    return "https://loginservice.nais.adeo.no/login";
  }
  // Preprod
  return "https://loginservice.nais.preprod.local/login";
};

export const hentRedirectBaseUrl = (): string => {
  if (erProd()) {
    return "https://syfomodiaperson.nais.adeo.no/sykefravaer/";
  }
  return "https://syfomodiaperson.nais.preprod.local/sykefravaer/";
};

export const lagreRedirectUrlILocalStorage = (href) => {
  localStorage.setItem("redirecturl", href);
};

export function get(url: string, personIdent?: string): Promise<any> {
  const headers = {
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
  };

  if (personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = personIdent;
  }

  return fetch(url, {
    credentials: "include",
    headers,
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        lagreRedirectUrlILocalStorage(window.location.href);
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}`;
      }
      if (res.status === 404) {
        throw new Error("404");
      }
      if (res.status >= 400 && res.status !== 403) {
        throw new Error("Det oppstod en feil");
      }
      if (res.status === 204) {
        return null;
      }
      return res.json().then((data) => {
        if (res.status === 403) {
          const tilgang = {
            harTilgang: data.harTilgang,
            begrunnelse: data.begrunnelse,
          };
          throw new Error403("403", 403, tilgang);
        }
        return data;
      });
    })
    .catch((err) => {
      log(err);
      throw err;
    });
}

export function post(
  url: string,
  body?: Record<string, any>,
  personIdent?: string
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
  };
  if (personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = personIdent;
  }

  return fetch(url, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers,
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        lagreRedirectUrlILocalStorage(window.location.href);
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}`;
        return null;
      } else if (res.status === 409) {
        log(res);
        throw new Error("409");
      } else if (res.status >= 400) {
        log(res);
        throw new Error("Forespørsel feilet");
      } else {
        const contentType = res.headers.get("Content-Type") || "";
        if (contentType.includes("json")) {
          return res.json();
        }
        return res;
      }
    })
    .catch((err) => {
      log(err);
      throw err;
    });
}
