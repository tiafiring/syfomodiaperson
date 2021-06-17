const express = require("express");
let router = express.Router();
const { initialize, Strategy } = require("unleash-client");

class ByEnhetAndEnvironment extends Strategy {
  constructor() {
    super("byEnhetAndEnvironment");
  }

  isEnabled(parameters, context) {
    const valgtEnhetMatches =
      parameters.valgtEnhet.indexOf(context.valgtEnhet) !== -1;
    const environmentEnabled =
      parameters.tilgjengeligIProd === "true"
        ? true
        : process.env.NAIS_CONTEXT === "dev";

    return valgtEnhetMatches && environmentEnabled;
  }
}

const unleash = initialize({
  url: "https://unleash.nais.io/api/",
  appName: "syfomodiaperson",
  environment: process.env.NAIS_CONTEXT,
  strategies: [new ByEnhetAndEnvironment()],
});

router.get("/dm2/:valgtEnhet", function (req, res) {
  const isEnabled = unleash.isEnabled("syfo.syfomodiaperson.dm2", {
    valgtEnhet: req.params.valgtEnhet,
  });

  res.status(200).send(isEnabled);
});

module.exports = router;
