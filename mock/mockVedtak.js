const mockData = require("./mockData");
const enums = require("./mockDataEnums");

const mockVedtak = (server) => {
  server.get("/veileder/vedtak", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.VEDTAK]));
  });
};

module.exports = mockVedtak;
