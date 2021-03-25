const requestUtil = require("./util/requestUtil");

const behandlendeEnhet = {
  enhetId: "0315",
  navn: "NAV Grünerløkka",
};

const mockSyfobehandlendeenhet = (server) => {
  server.get("/syfobehandlendeenhet/api/internad/:fnr", (req, res) => {
    if (
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER] &&
      req.headers[requestUtil.NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(behandlendeEnhet));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};

module.exports = mockSyfobehandlendeenhet;
