const requestUtil = require("../util/requestUtil");
const mockData = require("../mockData");

const mockIsdialogmote = (server) => {
  server.post(
    "/isdialogmote/api/post/v1/dialogmote/personident",
    (req, res) => {
      if (
        req.headers[requestUtil.NAV_PERSONIDENT_HEADER] &&
        req.headers[requestUtil.NAV_PERSONIDENT_HEADER].length === 11
      ) {
        res.sendStatus(200);
      } else {
        res.status(400).send("Did not find PersonIdent in headers");
      }
    }
  );
  server.get("/isdialogmote/api/get/v1/dialogmote/personident", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData.getDialogmoter()));
  });
};

module.exports = mockIsdialogmote;
