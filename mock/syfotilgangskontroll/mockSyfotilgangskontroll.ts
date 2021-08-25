import { tilgangBrukerMock } from "../data/tilgangtilbrukerMock";
import { SYFOTILGANGSKONTROLL_ROOT } from "../../src/apiConstants";

const Auth = require("../../server/auth/index.js");

export const mockSyfotilgangskontroll = (server) => {
  server.get(
    `${SYFOTILGANGSKONTROLL_ROOT}/tilgang/navident/bruker/:personident`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tilgangBrukerMock));
    }
  );
};
