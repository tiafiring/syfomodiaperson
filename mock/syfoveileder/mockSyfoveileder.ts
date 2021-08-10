import { veilederMock } from "../data/veilederMock";
import { SYFOVEILEDER_ROOT } from "../../src/apiConstants";

export const mockSyfoveileder = (server) => {
  server.get(`${SYFOVEILEDER_ROOT}/veileder/self`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(veilederMock));
  });
};
