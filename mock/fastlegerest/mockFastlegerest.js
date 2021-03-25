const mockFastleger = require("./mockFastleger");

const mockFastlegerest = (server) => {
  server.get("/fastlegerest/api/internad/fastlege/v1/fastleger", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockFastleger.getFastleger()));
  });
};

module.exports = mockFastlegerest;
