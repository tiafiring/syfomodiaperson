const mockData = require("./mockData");
const enums = require("./mockDataEnums");

const getOppfolgingstilfellerPerson = () => {
  return [
    {
      fom: "2020-10-15",
      tom: "2020-10-21",
    },
  ];
};

const mockModiasyforest = (server) => {
  server.get("/modiasyforest/api/internad/sykmeldinger", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
  });

  server.get("/modiasyforest/api/internad/allnaermesteledere", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.LEDERE]));
  });

  server.get(
    "/modiasyforest/api/internad/oppfolgingstilfelleperioder",
    (req, res) => {
      const { orgnummer } = req.query;
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(mockData[enums.OPPFOLGINGSTILFELLEPERIODER][orgnummer])
      );
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
    res.send(JSON.stringify(mockData[enums.BRUKERINFO]));
  });
};

module.exports = mockModiasyforest;
