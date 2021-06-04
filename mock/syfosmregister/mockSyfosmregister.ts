import { sykmeldingerMock } from "../data/sykmeldingerMock";

export const mockSyfosmregister = (server) => {
  server.get("/syfosmregister/api/v1/internal/sykmeldinger", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(sykmeldingerMock));
  });
};
