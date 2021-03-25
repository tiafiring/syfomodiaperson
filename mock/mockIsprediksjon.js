const mockData = require("./mockData");
const enums = require("./mockDataEnums");

const mockIspengestopp = (server) => {
  server.get("/isprediksjon/api/v1/prediksjon", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(mockData[enums.PREDIKSJON]);
  });
};

module.exports = mockIspengestopp;
