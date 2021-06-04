import { motebehovMock } from "../data/motebehovMock";
import { historikkmoterMock } from "../data/historikkmoterMock";

export const mockSyfomotebehov = (server) => {
  server.get("/syfomotebehov/api/internad/veileder/motebehov", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(motebehovMock));
  });

  server.post(
    "/syfomotebehov/api/internad/veileder/motebehov/:fnr/behandle",
    (req, res) => {
      res.sendStatus(200);
    }
  );

  server.get("/syfomotebehov/api/internad/veileder/historikk", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(historikkmoterMock));
  });

  server.post(
    "/syfomotebehov/api/internad/veileder/motebehov/:fnr/behandle",
    (req, res) => {
      const oppdaterteMotebehov = motebehovMock.map((motebehov) => {
        motebehov.behandletTidspunkt = new Date().toDateString();
        motebehov.behandletVeilederIdent = "Z990000";
      });

      Object.assign(motebehovMock, ...oppdaterteMotebehov);

      res.sendStatus(200);
    }
  );
};
