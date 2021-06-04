import { veilederMock } from "../data/veilederMock";

export const mockSyfoveileder = (server) => {
  server.get("/syfoveileder/api/veileder/self", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(veilederMock));
  });
};
