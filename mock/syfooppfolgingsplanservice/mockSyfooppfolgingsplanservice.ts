import { oppfolgingsplanMock } from "./oppfolgingsplanMock";
import { historikkoppfolgingsplanMock } from "../data/historikkoppfolgingsplanMock";
import { oppfolgingsplanerLPSMock } from "./oppfolgingsplanLPSMock";
import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";

const path = require("path");

const dokumentinfo = { antallSider: 4 };

export const mockSyfooppfolgingsplanservice = (server) => {
  server.get(
    "/syfooppfolgingsplanservice/api/internad/v1/oppfolgingsplan/:fnr",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(oppfolgingsplanMock));
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/v1/oppfolgingsplan/:fnr/historikk",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(historikkoppfolgingsplanMock));
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/dokument/:id/dokumentinfo",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dokumentinfo));
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/oppfolgingsplan/lps",
    (req, res) => {
      if (
        req.headers[NAV_PERSONIDENT_HEADER] &&
        req.headers[NAV_PERSONIDENT_HEADER].length === 11
      ) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(oppfolgingsplanerLPSMock()));
      } else {
        res.status(400).send();
      }
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/dokument/lps/:uuid",
    (req, res) => {
      const file = path.join(
        __dirname,
        "/oppfolgingsplan/pdf/oppfolgingsplanlps.pdf"
      );
      res.download(file, function (err) {
        if (err) {
          res.status(500).send("Error");
        }
      });
    }
  );
};
