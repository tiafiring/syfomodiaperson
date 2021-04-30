const requestUtil = require("../util/requestUtil");

const mockIsdialogmote = (server) => {
  server.post("/isdialogmote/api/v1/dialogmote/personident", (req, res) => {
    if (
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER] &&
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.sendStatus(200);
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};

module.exports = mockIsdialogmote;
