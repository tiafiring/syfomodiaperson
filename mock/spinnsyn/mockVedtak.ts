import { vedtakMock } from "../data/vedtakMock";

export const mockVedtak = (server) => {
  server.get("/veileder/vedtak", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(vedtakMock));
  });
};
