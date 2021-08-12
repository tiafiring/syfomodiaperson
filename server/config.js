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
  fastlegerest: {
    host: envVar({
      name: "FASTLEGEREST_HOST",
    }),
  },
  flexInternGateway: {
    host: envVar({
      name: "FLEX_INTERN_GATEWAY_HOST",
    }),
  },
  isdialogmote: {
    host: envVar({
      name: "ISDIALOGMOTE_HOST",
    }),
  },
  ispengestopp: {
    host: envVar({
      name: "ISPENGESTOPP_HOST",
    }),
  },
  ispersonoppgave: {
    host: envVar({
      name: "ISPERSONOPPGAVE_HOST",
    }),
  },
  isprediksjon: {
    host: envVar({
      name: "ISPREDIKSJON_HOST",
    }),
  },
  modiacontextholder: {
    host: envVar({
      name: "MODIACONTEXTHOLDER_HOST",
    }),
  },
  modiasyforest: {
    host: envVar({
      name: "MODIASYFOREST_HOST",
    }),
  },
  syfobehandlendeenhet: {
    host: envVar({
      name: "SYFOBEHANDLENDEENHET_HOST",
    }),
  },
  syfomoteadmin: {
    host: envVar({
      name: "SYFOMOTEADMIN_HOST",
    }),
  },
  syfomotebehov: {
    host: envVar({
      name: "SYFOMOTEBEHOV_HOST",
    }),
  },
  syfooppfolgingsplanservice: {
    host: envVar({
      name: "SYFOOPPFOLGINGSPLANSERVICE_HOST",
    }),
  },
  syfoperson: {
    host: envVar({
      name: "SYFOPERSON_HOST",
    }),
  },
  syfosmregister: {
    host: envVar({
      name: "SYFOSMREGISTER_HOST",
    }),
  },
  syfosoknad: {
    host: envVar({
      name: "SYFOSOKNAD_HOST",
    }),
  },
  syfotilgangskontroll: {
    host: envVar({
      name: "SYFOTILGANGSKONTROLL_HOST",
    }),
  },
  syfoveileder: {
    host: envVar({
      name: "SYFOVEILEDER_HOST",
    }),
  },
};

module.exports = {
  auth: auth,
};
