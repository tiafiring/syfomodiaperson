export const erProd = () => {
  return window.location.href.indexOf("nais.adeo.no") > -1;
};

export const erPreProd = () => {
  return window.location.href.indexOf("nais.preprod.local") > -1;
};

export const finnMiljoStreng = () => {
  return erPreProd() ? "-q1" : "";
};

export const erLokal = (): boolean => {
  return window.location.host.indexOf("localhost") > -1;
};

export const finnNaisUrlIntern = () => {
  return erPreProd() ? ".dev.intern.nav.no" : ".intern.nav.no";
};

export const fullNaisUrlIntern = (host: string, path: string) => {
  if (erLokal()) {
    return path;
  }
  return `https://${host}${finnNaisUrlIntern()}${path}`;
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

const env = {
  DEVELOPMENT: "Development",
  PREPROD: "Preprod",
  PRODUCTION: "Production",
  UNKNOWN: "Unknown",
};

export const getEnvironmentAsString = (): string => {
  if (erProd()) {
    return env.PRODUCTION;
  } else if (erPreProd()) {
    return env.PREPROD;
  } else if (erLokal()) {
    return env.DEVELOPMENT;
  } else {
    return env.UNKNOWN;
  }
};
