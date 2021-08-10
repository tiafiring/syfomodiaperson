//Enable everything for dev
import { UNLEASH_ROOT } from "../../src/apiConstants";

export const mockUnleash = (server) => {
  server.get(`${UNLEASH_ROOT}/*`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(true);
  });
};
