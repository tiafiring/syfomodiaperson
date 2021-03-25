const requestUtil = require("../util/requestUtil");

const mockData = require("../mockData");
const enums = require("../mockDataEnums");

const mockIspengestopp = (server) => {
  server.get("/isprediksjon/api/v1/prediksjon", (req, res) => {
    if (
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER] &&
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(mockData[enums.PREDIKSJON]);
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};

module.exports = mockIspengestopp;
