import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";
import { dialogmoterMock } from "../data/dialogmoterMock";

export const mockIsdialogmote = (server) => {
  server.post(
    "/isdialogmote/api/post/v1/dialogmote/personident",
    (req, res) => {
      if (
        req.headers[NAV_PERSONIDENT_HEADER] &&
        req.headers[NAV_PERSONIDENT_HEADER].length === 11
      ) {
        dialogmoterMock[0] = {
          ...dialogmoterMock[0],
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
    res.send(JSON.stringify(dialogmoterMock));
  });

  server.post(
    "/isdialogmote/api/post/v1/dialogmote/:moteuuid/avlys",
    (req, res) => {
      const { moteuuid } = req.params;
      const dialogmoteToUpdate = dialogmoterMock.find(
        (dialogmote) => dialogmote.uuid === moteuuid
      );
      dialogmoteToUpdate!!.status = "AVLYST";
      res.sendStatus(200);
    }
  );

  server.post(
    "/isdialogmote/api/post/v1/dialogmote/:moteuuid/tidsted",
    (req, res) => {
      res.sendStatus(200);
    }
  );

  server.post(
    "/isdialogmote/api/post/v1/dialogmote/:moteuuid/ferdigstill",
    (req, res) => {
      const { moteuuid } = req.params;
      const dialogmoteToUpdate = dialogmoterMock.find(
        (dialogmote) => dialogmote.uuid === moteuuid
      );
      dialogmoteToUpdate!!.status = "FERDIGSTILT";
      res.sendStatus(200);
    }
  );
};
