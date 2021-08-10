import { fastlegerMock } from "./fastlegerMock";
import { FASTLEGEREST_ROOT } from "../../src/apiConstants";

export const mockFastlegerest = (server) => {
  server.get(`${FASTLEGEREST_ROOT}/fastleger`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(fastlegerMock));
  });
};
