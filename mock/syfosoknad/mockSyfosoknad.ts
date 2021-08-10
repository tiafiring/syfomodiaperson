import { soknaderMock } from "../data/soknaderMock";
import { SYFOSOKNAD_ROOT } from "../../src/apiConstants";

export const mockSyfosoknad = (server) => {
  server.get(`${SYFOSOKNAD_ROOT}/soknader`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(soknaderMock));
  });
};
