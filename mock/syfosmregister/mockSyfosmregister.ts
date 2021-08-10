import { sykmeldingerMock } from "../data/sykmeldingerMock";
import { SYFOSMREGISTER_ROOT } from "../../src/apiConstants";

export const mockSyfosmregister = (server) => {
  server.get(`${SYFOSMREGISTER_ROOT}/internal/sykmeldinger`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(sykmeldingerMock));
  });
};
