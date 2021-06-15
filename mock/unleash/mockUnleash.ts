//Enable everything for dev
export const mockUnleash = (server) => {
  server.get("/isEnabled/*", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(true);
  });
};
