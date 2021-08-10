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
  modiacontextholder: {
    host: envVar({
      name: "MODIACONTEXTHOLDER_HOST",
    }),
  },
};

module.exports = {
  auth: auth,
};
