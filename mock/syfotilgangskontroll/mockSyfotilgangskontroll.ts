import { tilgangBrukerMock } from "../data/tilgangtilbrukerMock";

export const mockSyfotilgangskontroll = (server) => {
  server.get("/syfo-tilgangskontroll/api/tilgang/bruker", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(tilgangBrukerMock));
  });
};
