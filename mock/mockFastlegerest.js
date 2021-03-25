const mockData = require("./mockData");
const enums = require("./mockDataEnums");

const mockFastlegerest = (server) => {
  server.get("/fastlegerest/api/internad/fastlege/v1/fastleger", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.FASTLEGER]));
  });
};

module.exports = mockFastlegerest;
