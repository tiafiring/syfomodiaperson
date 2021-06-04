import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";
import { prediksjonMock } from "../data/prediksjonMock";

export const mockIsprediksjon = (server) => {
  server.get("/isprediksjon/api/v1/prediksjon", (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(prediksjonMock));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};
