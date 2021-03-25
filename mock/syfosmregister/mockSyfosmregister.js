const mockData = require("../mockData");
const enums = require("../mockDataEnums");

const mockSyfosmregister = (server) => {
  server.get("/syfosmregister/api/v1/internal/sykmeldinger", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
  });
};

module.exports = mockSyfosmregister;
