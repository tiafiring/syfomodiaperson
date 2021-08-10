import { vedtakMock } from "../data/vedtakMock";
import { VEDTAK_ROOT } from "../../src/apiConstants";

export const mockVedtak = (server) => {
  server.get(`${VEDTAK_ROOT}`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(vedtakMock));
  });
};
