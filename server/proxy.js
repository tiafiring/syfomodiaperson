const express = require("express");
const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const url = require("url");

const Config = require("./config.js");

const proxyExternalHost = (host, parseReqBody) =>
  proxy(host, {
    https: true,
    parseReqBody: parseReqBody,
    proxyReqOptDecorator: async (options, srcReq) => {
      if (!options.headers) {
        options.headers = {};
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

      if (host === Config.auth.syfobehandlendeenhet.host) {
        const newPathSyfobehandlendeenhet = newPath.replace(
          "syfobehandlendeenhet/",
          ""
        );
        return `https://${newPathSyfobehandlendeenhet}`;
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
  return proxyExternalHost(externalAppConfig.host, req.method === "POST")(
    req,
    res,
    next
  );
};

const setup = () => {
  const router = express.Router();

  router.use("/fastlegerest/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.fastlegerest);
  });

  router.use("/modiacontextholder/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.modiacontextholder);
  });

  router.use("/modiasyforest/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.modiasyforest);
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

  router.use("/syfosoknad/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfosoknad);
  });

  router.use("/syfo-tilgangskontroll/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfotilgangskontroll);
  });

  router.use("/syfoveileder/*", (req, res, next) => {
    proxyOnBehalfOf(req, res, next, Config.auth.syfoveileder);
  });

  router.use(
    "/ispersonoppgave/api/get",
    cookieParser(),
    proxy(Config.auth.ispersonoppgave.host, {
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
    "/ispersonoppgave/api/post",
    cookieParser(),
    proxy(Config.auth.ispersonoppgave.host, {
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
    proxy(Config.auth.isdialogmote.host, {
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
    proxy(Config.auth.isdialogmote.host, {
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

  router.use("/veileder/vedtak", cookieParser(), (req, res) => {
    const token = req.cookies["isso-idtoken"];
    const fnr = req.query.fnr;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        fnr,
      },
    };

    const url = `https://${Config.auth.flexInternGateway.host}/spinnsyn-backend/api/v1/veileder/vedtak?fnr=${fnr}`;
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

  router.use("/syfosmregister/api", cookieParser(), (req, res) => {
    const token = req.cookies["isso-idtoken"];
    const fnr = req.query.fnr;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        fnr,
      },
    };

    const url = `http://${Config.auth.syfosmregister.host}/api/v1/internal/sykmeldinger`;
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
        .get(
          `http://${Config.auth.ispengestopp.host}/api/v1/person/status`,
          options
        )
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
        .post(
          `http://${Config.auth.ispengestopp.host}/api/v1/person/flagg`,
          data,
          {
            headers,
          }
        )
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
      .get(`http://${Config.auth.isprediksjon.host}/api/v1/prediksjon`, options)
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
