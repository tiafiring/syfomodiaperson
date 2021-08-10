import { motebehovMock } from "../data/motebehovMock";
import { historikkmoterMock } from "../data/historikkmoterMock";
import { SYFOMOTEBEHOV_ROOT } from "../../src/apiConstants";

export const mockSyfomotebehov = (server) => {
  server.get(`${SYFOMOTEBEHOV_ROOT}/motebehov`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(motebehovMock));
  });

  server.post(`${SYFOMOTEBEHOV_ROOT}/motebehov/:fnr/behandle`, (req, res) => {
    res.sendStatus(200);
  });

  server.get(`${SYFOMOTEBEHOV_ROOT}/historikk`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(historikkmoterMock));
  });

  server.post(`${SYFOMOTEBEHOV_ROOT}/motebehov/:fnr/behandle`, (req, res) => {
    const oppdaterteMotebehov = motebehovMock.map((motebehov) => {
      motebehov.behandletTidspunkt = new Date().toDateString();
      motebehov.behandletVeilederIdent = "Z990000";
    });

    Object.assign(motebehovMock, ...oppdaterteMotebehov);

    res.sendStatus(200);
  });
};
