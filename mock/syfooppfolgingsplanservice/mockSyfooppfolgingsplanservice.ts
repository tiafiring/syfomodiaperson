import { oppfolgingsplanMock } from "./oppfolgingsplanMock";
import { historikkoppfolgingsplanMock } from "../data/historikkoppfolgingsplanMock";
import { oppfolgingsplanerLPSMock } from "./oppfolgingsplanLPSMock";
import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";
import { SYFOOPPFOLGINGSPLANSERVICE_ROOT } from "../../src/apiConstants";

const path = require("path");

const dokumentinfo = { antallSider: 4 };

export const mockSyfooppfolgingsplanservice = (server) => {
  server.get(
    `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/v1/oppfolgingsplan/:fnr`,
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(oppfolgingsplanMock));
    }
  );

  server.get(
    `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/v1/oppfolgingsplan/:fnr/historikk`,
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(historikkoppfolgingsplanMock));
    }
  );

  server.get(
    `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/dokument/:id/dokumentinfo`,
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dokumentinfo));
    }
  );

  server.get(
    `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/oppfolgingsplan/lps`,
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
    `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/dokument/lps/:uuid`,
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
