import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";
import { personAdresseMock } from "../data/personAdresseMock";
import { SYFOPERSON_ROOT } from "../../src/apiConstants";

const diskresjonskode = "7";
const isEgenAnsatt = true;

export const mockSyfoperson = (server) => {
  server.get(`${SYFOPERSON_ROOT}/person/diskresjonskode`, (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(diskresjonskode);
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });

  server.get(`${SYFOPERSON_ROOT}/person/egenansatt`, (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(isEgenAnsatt));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });

  server.get(`${SYFOPERSON_ROOT}/person/adresse`, (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(personAdresseMock));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};
