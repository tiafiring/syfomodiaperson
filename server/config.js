const dotenv = require("dotenv");
dotenv.config();

const envVar = ({ name, defaultValue }) => {
  const fromEnv = process.env[name];
  if (fromEnv) {
    return fromEnv;
  }
  if (typeof defaultValue === "string") {
    return defaultValue;
  } else if (typeof defaultValue === "object") {
    if (isDev && typeof defaultValue.dev === "string") {
      return defaultValue.dev;
    }
    if (isProd && typeof defaultValue.prod === "string") {
      return defaultValue.prod;
    }
  }
  throw new Error(`Missing required environment variable ${name}`);
};

const isDev = envVar({ name: "NODE_ENV" }) === "development";
const isProd = envVar({ name: "NODE_ENV" }) === "production";

// For auth
const auth = {
  internarbeidsflatedecoratorHost: envVar({
    name: "INTERNARBEIDSFLATEDECORATOR_HOST",
  }),

  fastlegerest: {
    applicationName: "fastlegerest",
    host: envVar({
      name: "FASTLEGEREST_HOST",
    }),
  },
  flexInternGateway: {
    applicationName: "flex-intern-gateway",
    host: envVar({
      name: "FLEX_INTERN_GATEWAY_HOST",
    }),
    bearerHeader: true,
  },
  isdialogmote: {
    applicationName: "isdialogmote",
    host: envVar({
      name: "ISDIALOGMOTE_HOST",
    }),
    bearerHeader: true,
    removePathPrefix: true,
  },
  ispengestopp: {
    applicationName: "ispengestopp",
    host: envVar({
      name: "ISPENGESTOPP_HOST",
    }),
    bearerHeader: true,
    removePathPrefix: true,
  },
  ispersonoppgave: {
    applicationName: "ispersonoppgave",
    host: envVar({
      name: "ISPERSONOPPGAVE_HOST",
    }),
    bearerHeader: true,
    removePathPrefix: true,
  },
  isprediksjon: {
    applicationName: "isprediksjon",
    host: envVar({
      name: "ISPREDIKSJON_HOST",
    }),
    bearerHeader: true,
    removePathPrefix: true,
  },
  modiacontextholder: {
    applicationName: "modiacontextholder",
    host: envVar({
      name: "MODIACONTEXTHOLDER_HOST",
    }),
  },
  modiasyforest: {
    applicationName: "modiasyforest",
    host: envVar({
      name: "MODIASYFOREST_HOST",
    }),
  },
  syfobehandlendeenhet: {
    applicationName: "syfobehandlendeenhet",
    host: envVar({
      name: "SYFOBEHANDLENDEENHET_HOST",
    }),
    removePathPrefix: true,
  },
  syfomoteadmin: {
    applicationName: "syfomoteadmin",
    host: envVar({
      name: "SYFOMOTEADMIN_HOST",
    }),
  },
  syfomotebehov: {
    applicationName: "syfomotebehov",
    host: envVar({
      name: "SYFOMOTEBEHOV_HOST",
    }),
  },
  syfooppfolgingsplanservice: {
    applicationName: "syfooppfolgingsplanservice",
    host: envVar({
      name: "SYFOOPPFOLGINGSPLANSERVICE_HOST",
    }),
  },
  syfoperson: {
    applicationName: "syfoperson",
    host: envVar({
      name: "SYFOPERSON_HOST",
    }),
  },
  syfosmregister: {
    applicationName: "syfosmregister",
    host: envVar({
      name: "SYFOSMREGISTER_HOST",
    }),
    bearerHeader: true,
    removePathPrefix: true,
  },
  syfosoknad: {
    applicationName: "syfosoknad",
    host: envVar({
      name: "SYFOSOKNAD_HOST",
    }),
  },
  syfotilgangskontroll: {
    applicationName: "syfo-tilgangskontroll",
    host: envVar({
      name: "SYFOTILGANGSKONTROLL_HOST",
    }),
  },
  syfoveileder: {
    applicationName: "syfoveileder",
    host: envVar({
      name: "SYFOVEILEDER_HOST",
    }),
  },
};

module.exports = {
  auth: auth,
};
