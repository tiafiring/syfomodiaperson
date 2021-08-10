const express = require("express");
const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const Config = require("./config.js");

const flexInternGatewayUrl =
  process.env.NAIS_CONTEXT === "dev"
    ? "flex-intern-gateway.dev.intern.nav.no"
    : "flex-intern-gateway.intern.nav.no";

const syfopersonHost =
  process.env.NAIS_CONTEXT === "dev"
    ? "https://syfoperson.dev.intern.nav.no"
    : "https://syfoperson.intern.nav.no";

const ispersonoppgaveHost =
  process.env.NAIS_CONTEXT === "dev"
    ? "ispersonoppgave.dev.intern.nav.no"
    : "ispersonoppgave.intern.nav.no";

const isdialogmoteHost =
  process.env.NAIS_CONTEXT === "dev"
    ? "isdialogmote.dev.intern.nav.no"
    : "isdialogmote.intern.nav.no";

const syfoveilederHost =
  process.env.NAIS_CONTEXT === "dev"
    ? "https://syfoveileder.dev.intern.nav.no"
    : "https://syfoveileder.intern.nav.no";

const syfooppfolgingsplanserviceHost =
  process.env.NAIS_CONTEXT === "dev"
    ? "https://syfooppfolgingsplanservice.dev.intern.nav.no"
    : "https://syfooppfolgingsplanservice.intern.nav.no";

const setup = () => {
  const router = express.Router();

  router.use(
    "/fastlegerest/api",
    proxy("fastlegerest.teamsykefravr", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/fastlegerest/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for fastlegerest", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/ispersonoppgave/api/get",
    cookieParser(),
    proxy(ispersonoppgaveHost, {
      https: true,
      parseReqBody: false,
      proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        const token = srcReq.cookies["isso-idtoken"];
        proxyReqOpts.headers["Authorization"] = `Bearer ${token}`;
        proxyReqOpts.headers["Content-Type"] = "application/json";
        return proxyReqOpts;
      },
      proxyReqPathResolver: function (req) {
        return `/api${req.path}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for ispersonoppgave", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/syfo-tilgangskontroll/api",
    proxy("syfo-tilgangskontroll.teamsykefravr", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/syfo-tilgangskontroll/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for tilgang", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/modiacontextholder/api",
    proxy(Config.auth.modiacontextholder.host, {
      https: true,
      proxyReqPathResolver: function (req) {
        return `/modiacontextholder/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for modiacontextholder", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/ispersonoppgave/api/post",
    cookieParser(),
    proxy(ispersonoppgaveHost, {
      https: true,
      parseReqBody: true,
      proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        const token = srcReq.cookies["isso-idtoken"];
        proxyReqOpts.headers["Authorization"] = `Bearer ${token}`;
        proxyReqOpts.headers["Content-Type"] = "application/json";
        return proxyReqOpts;
      },
      proxyReqPathResolver: function (req) {
        return `/api${req.path}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for ispersonoppgave", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/isdialogmote/api/get",
    cookieParser(),
    proxy(isdialogmoteHost, {
      https: true,
      parseReqBody: false,
      proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        const token = srcReq.cookies["isso-idtoken"];
        proxyReqOpts.headers["Authorization"] = `Bearer ${token}`;
        proxyReqOpts.headers["Content-Type"] = "application/json";
        return proxyReqOpts;
      },
      proxyReqPathResolver: function (req) {
        return `/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.log("Error in proxy for isdialogmote", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/isdialogmote/api/post",
    cookieParser(),
    proxy(isdialogmoteHost, {
      https: true,
      parseReqBody: true,
      proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        const token = srcReq.cookies["isso-idtoken"];
        proxyReqOpts.headers["Authorization"] = `Bearer ${token}`;
        return proxyReqOpts;
      },
      proxyReqPathResolver: function (req) {
        return `/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.log("Error in proxy for isdialogmote", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/modiasyforest/api",
    proxy("modiasyforest.teamsykefravr", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/modiasyforest/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for modiasyforest", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/syfooppfolgingsplanservice/api",
    proxy(syfooppfolgingsplanserviceHost, {
      proxyReqPathResolver: function (req) {
        return `/syfooppfolgingsplanservice/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error(
          "Error in proxy for syfooppfolgingsplanservice",
          err.message
        );
        next(err);
      },
    })
  );

  router.use(
    "/syfomoteadmin/api",
    proxy("syfomoteadmin.teamsykefravr", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/syfomoteadmin/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for syfomoteadmin", err.message);
        next(err);
      },
    })
  );

  router.use("/veileder/vedtak", cookieParser(), (req, res) => {
    const token = req.cookies["isso-idtoken"];
    const fnr = req.query.fnr;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        fnr,
      },
    };

    const url = `https://${flexInternGatewayUrl}/spinnsyn-backend/api/v1/veileder/vedtak?fnr=${fnr}`;
    axios
      .get(url, options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.error("Error in proxy for spinnsyn-backend", err.message);
        res.sendStatus(err.response.status);
      });
  });

  router.use(
    "/syfomotebehov/api",
    proxy("syfomotebehov.team-esyfo", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/syfomotebehov/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for syfomotebehov", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/syfosoknad/api",
    proxy("syfosoknad.flex", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/syfosoknad/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for syfosoknad", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/syfobehandlendeenhet/api",
    proxy("syfobehandlendeenhet.teamsykefravr", {
      https: false,
      proxyReqPathResolver: function (req) {
        return `/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for syfobehandlendeenhet", err.message);
        next(err);
      },
    })
  );

  router.use(
    "/syfoperson/api",
    proxy(syfopersonHost, {
      proxyReqPathResolver: function (req) {
        return `/syfoperson/api${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for syfoperson", err.message);
        next(err);
      },
    })
  );

  router.use("/syfosmregister/api", cookieParser(), (req, res) => {
    const token = req.cookies["isso-idtoken"];
    const fnr = req.query.fnr;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        fnr,
      },
    };

    const url =
      "http://syfosmregister.teamsykmelding/api/v1/internal/sykmeldinger";
    axios
      .get(url, options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.error("Error in proxy for syfosmregister", err.message);
        res.sendStatus(err.response.status);
      });
  });

  router.use(
    "/ispengestopp/api/v1/person/status",
    cookieParser(),
    (req, res) => {
      const token = req.cookies["isso-idtoken"];
      const fnr = req.query.fnr;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          fnr,
        },
      };

      axios
        .get(`http://ispengestopp.teamsykefravr/api/v1/person/status`, options)
        .then((response) => {
          if (response.status === 204) {
            res.sendStatus(204);
          } else {
            res.send(response.data);
          }
        })
        .catch((err) => {
          console.error("Error in proxy for ispengestopp", err.message);
          res.sendStatus(err.response.status);
        });
    }
  );

  router.use(
    "/ispengestopp/api/v1/person/flagg",
    cookieParser(),
    (req, res) => {
      const token = req.cookies["isso-idtoken"];
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = req.body;

      axios
        .post(`http://ispengestopp.teamsykefravr/api/v1/person/flagg`, data, {
          headers,
        })
        .then((response) => {
          res.sendStatus(response.status);
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(err.response.status);
        });
    }
  );

  router.use("/isprediksjon/api/v1/prediksjon", cookieParser(), (req, res) => {
    const token = req.cookies["isso-idtoken"];
    const options = {
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://isprediksjon.teamsykefravr/api/v1/prediksjon`, options)
      .then((response) => {
        if (response.status === 204) {
          res.sendStatus(204);
        } else {
          res.send(response.data);
        }
      })
      .catch((err) => {
        console.error("Error in proxy for isprediksjon", err.message);
        res.sendStatus(err.response.status);
      });
  });

  router.use(
    "/syfoveileder/api",
    proxy(syfoveilederHost, {
      proxyReqPathResolver: function (req) {
        return `/syfoveileder/api/v1/${req.url}`;
      },
      proxyErrorHandler: function (err, res, next) {
        console.error("Error in proxy for syfoveileder", err);
        next(err);
      },
    })
  );

  return router;
};

module.exports = setup;
