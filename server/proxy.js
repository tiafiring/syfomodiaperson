const express = require("express");
const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const url = require("url");

const Config = require("./config.js");

const proxyExternalHost = (
  { applicationName, bearerHeader, host, removePathPrefix },
  parseReqBody
) =>
  proxy(host, {
    https: true,
    parseReqBody: parseReqBody,
    proxyReqOptDecorator: async (options, srcReq) => {
      if (!options.headers) {
        options.headers = {};
      }
      if (bearerHeader) {
        const token = srcReq.cookies["isso-idtoken"];
        options.headers["Authorization"] = `Bearer ${token}`;
      }
      if (
        host === Config.auth.ispengestopp.host ||
        host === Config.auth.flexInternGateway.host ||
        host === Config.auth.syfosmregister.host
      ) {
        options.headers["fnr"] = srcReq.query.fnr;
      }
      return options;
    },
    proxyReqPathResolver: (req) => {
      const urlFromApi = url.parse(host);
      const pathFromApi =
        urlFromApi.pathname === "/" ? "" : urlFromApi.pathname;

      const urlFromRequest = url.parse(req.originalUrl);
      const pathFromRequest = urlFromRequest.pathname;

      const queryString = urlFromRequest.query;
      const newPath =
        (pathFromApi ? pathFromApi : "") +
        (pathFromRequest ? pathFromRequest : "") +
        (queryString ? "?" + queryString : "");

      if (removePathPrefix) {
        const newPathWithoutPrefix = newPath.replace(`${applicationName}/`, "");
        return `https://${newPathWithoutPrefix}`;
      }
      return `https://${newPath}`;
    },
    proxyErrorHandler: (err, res, next) => {
      console.log(`Error in proxy for ${host} ${err.message}, ${err.code}`);
      if (err && err.code === "ECONNREFUSED") {
        console.log("proxyErrorHandler: Got ECONNREFUSED");
        return res.status(503).send({ message: `Could not contact ${host}` });
      }
      next(err);
    },
  });

const proxyOnBehalfOf = (req, res, next, externalAppConfig) => {
  return proxyExternalHost(externalAppConfig, req.method === "POST")(
    req,
    res,
    next
  );
};

const setup = () => {
  const router = express.Router();

  router.use("/isdialogmote/*", cookieParser(), (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.isdialogmote);
  });

  router.use("/ispengestopp/*", cookieParser(), (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.ispengestopp);
  });

  router.use("/ispersonoppgave/*", cookieParser(), (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.ispersonoppgave);
  });

  router.use("/isprediksjon/*", cookieParser(), (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.isprediksjon);
  });

  router.use("/fastlegerest/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.fastlegerest);
  });

  router.use("/modiacontextholder/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.modiacontextholder);
  });

  router.use("/modiasyforest/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.modiasyforest);
  });

  router.use("/spinnsyn-backend/*", cookieParser(), (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.flexInternGateway);
  });

  router.use("/syfobehandlendeenhet/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfobehandlendeenhet);
  });

  router.use("/syfomoteadmin/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfomoteadmin);
  });

  router.use("/syfomotebehov/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfomotebehov);
  });

  router.use("/syfooppfolgingsplanservice/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfooppfolgingsplanservice);
  });

  router.use("/syfoperson/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfoperson);
  });

  router.use("/syfosmregister/*", cookieParser(), (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfosmregister);
  });

  router.use("/syfosoknad/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfosoknad);
  });

  router.use("/syfo-tilgangskontroll/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfotilgangskontroll);
  });

  router.use("/syfoveileder/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfoveileder);
  });

  router.use("/syfoveileder/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfoveileder);
  });

  router.use(
    "/internarbeidsflatedecorator",
    proxy(Config.auth.internarbeidsflatedecoratorHost, {
      https: true,
      proxyReqPathResolver: (req) => {
        return `/internarbeidsflatedecorator${req.url}`;
      },
      proxyErrorHandler: (err, res, next) => {
        console.log(
          `Error in proxy for internarbeidsflatedecorator ${err.message}, ${err.code}`
        );
        if (err && err.code === "ECONNREFUSED") {
          console.log("proxyErrorHandler: Got ECONNREFUSED");
          return res
            .status(503)
            .send({ message: `Could not contact internarbeidsflatedecorator` });
        }
        next(err);
      },
    })
  );

  return router;
};

module.exports = setup;
