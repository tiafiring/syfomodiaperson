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
        mockData.dialogmoter[0] = {
          ...mockData.dialogmoter[0],
          ...req.body,
          status: "INNKALT",
        };
        res.sendStatus(200);
      } else {
        res.status(400).send("Did not find PersonIdent in headers");
      }
    }
  );
  server.get("/isdialogmote/api/get/v1/dialogmote/personident", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData.dialogmoter));
  });

  server.post(
    "/isdialogmote/api/post/v1/dialogmote/:moteuuid/avlys",
    (req, res) => {
      const { moteuuid } = req.params;
      const dialogmoteToUpdate = mockData.dialogmoter.find(
        (dialogmote) => dialogmote.uuid === moteuuid
      );
      dialogmoteToUpdate.status = "AVLYST";
      res.sendStatus(200);
    }
  );
};

module.exports = mockIsdialogmote;
