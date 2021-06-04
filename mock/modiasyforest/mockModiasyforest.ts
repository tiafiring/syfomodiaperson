import { sykmeldingerMock } from "../data/sykmeldingerMock";
import { ledereMock } from "../data/ledereMock";
import { oppfolgingstilfelleperioderMock } from "../data/oppfolgingstilfelleperioderMock";
import { brukerinfoMock } from "../data/brukerinfoMock";

const getOppfolgingstilfellerPerson = () => {
  return [
    {
      fom: "2020-10-15",
      tom: "2020-10-21",
    },
  ];
};

export const mockModiasyforest = (server) => {
  server.get("/modiasyforest/api/internad/sykmeldinger", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(sykmeldingerMock));
  });

  server.get("/modiasyforest/api/internad/allnaermesteledere", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(ledereMock));
  });

  server.get(
    "/modiasyforest/api/internad/oppfolgingstilfelleperioder",
    (req, res) => {
      const { orgnummer } = req.query;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(oppfolgingstilfelleperioderMock[orgnummer]));
    }
  );

  server.get(
    "/modiasyforest/api/internad/oppfolgingstilfelleperioder/utenarbeidsgiver",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(getOppfolgingstilfellerPerson());
    }
  );

  server.get("/modiasyforest/api/internad/brukerinfo", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(brukerinfoMock));
  });
};
