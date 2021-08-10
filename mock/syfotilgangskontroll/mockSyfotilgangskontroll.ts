import { tilgangBrukerMock } from "../data/tilgangtilbrukerMock";
import { SYFOTILGANGSKONTROLL_ROOT } from "../../src/apiConstants";

export const mockSyfotilgangskontroll = (server) => {
  server.get(`${SYFOTILGANGSKONTROLL_ROOT}/tilgang/bruker`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(tilgangBrukerMock));
  });
};
