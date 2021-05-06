const requestUtil = require("../util/requestUtil");

const mockData = require("../mockData");

const mockIsprediksjon = (server) => {
  server.get("/isprediksjon/api/v1/prediksjon", (req, res) => {
    if (
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER] &&
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockData.getPrediksjon()));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};

module.exports = mockIsprediksjon;
