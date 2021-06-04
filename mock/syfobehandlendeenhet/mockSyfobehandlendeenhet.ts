import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";

const behandlendeEnhet = {
  enhetId: "0315",
  navn: "NAV Grünerløkka",
};

export const mockSyfobehandlendeenhet = (server) => {
  server.get("/syfobehandlendeenhet/api/internad/personident", (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(behandlendeEnhet));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};
