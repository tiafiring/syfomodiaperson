require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const prometheus = require('prom-client');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const axios = require('axios');

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({timeout: 5000});

const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
});
const server = express();

const env = process.argv[2];
const settings = env === 'local' ? {isProd: false} : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const modiacontextholderUrl =  process.env.NAIS_CONTEXT === 'dev'
    ? 'modiacontextholder.q1'
    : 'modiacontextholder.default';

const renderApp = () => {
    return new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {},
                settings,
            ),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            },
        );
    });
};

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

const startServer = (html) => {
    server.use(
        '/sykefravaer/resources',
        express.static(path.resolve(__dirname, 'dist/resources')),
    );

    server.use(
        '/sykefravaer/img',
        express.static(path.resolve(__dirname, 'dist/resources/img')),
    );

    server.get(
        ['/', '/sykefravaer/?', /^\/sykefravaer\/(?!(resources|img)).*$/],
        nocache,
        (req, res) => {
            res.send(html);
            httpRequestDurationMicroseconds
                .labels(req.route.path)
                .observe(10);
        },
    );

    server.get('/actuator/metrics', (req, res) => {
        res.set('Content-Type', prometheus.register.contentType);
        res.end(prometheus.register.metrics());
    });

    server.get('/health/isAlive', (req, res) => {
        res.sendStatus(200);
    });

    server.get('/health/isReady', (req, res) => {
        res.sendStatus(200);
    });

    if (env === 'local') {
        require('./mock/mockEndepunkter')(server, env === 'local');
    } else {
        server.use('/syfo-tilgangskontroll/api', proxy('syfo-tilgangskontroll.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfo-tilgangskontroll/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for tilgang", err);
                next(err);
            },
        }));
        server.use('/modiacontextholder/api', proxy(modiacontextholderUrl,  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/modiacontextholder/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for modiacontextholder", err);
                next(err);
            },
        }));
        server.use('/modiasyforest/api', proxy('modiasyforest.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/modiasyforest/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for modiasyforest", err);
                next(err);
            },
        }));
        server.use('/syfooppfolgingsplanservice/api', proxy('syfooppfolgingsplanservice.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfooppfolgingsplanservice/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for syfooppfolgingsplanservice", err);
                next(err);
            },
        }));
        server.use('/syfotekster/api', proxy('syfotekster.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfotekster/api${req.path}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for tekster", err);
                next(err);
            },
        }));
        server.use('/syfosoknad/api', proxy('syfosoknad.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfosoknad/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for syfosoknad", err);
                next(err);
            },
        }));
        server.use('/syfobehandlendeenhet/api', proxy('syfobehandlendeenhet.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for syfobehandlendeenhet", err);
                next(err);
            },
        }));
        server.use('/syfoperson/api', proxy('syfoperson.default',  {
            https: false,
            proxyReqPathResolver: function(req) {
                return `/syfoperson/api${req.url}`
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("Error in proxy for syfoperson", err);
                next(err);
            },
        }));
        server.use('/syfosmregister/api', cookieParser(), (req, res) => {
            const token = req.cookies['isso-idtoken'];
            const fnr = req.query.fnr;
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'fnr': fnr,
                }
            };

            const url = `http://syfosmregister.default/api/v1/internal/sykmeldinger`;
            axios.get(url, options)
                .then(response => {
                    res.send(response.data)
                })
                .catch(err => {
                    console.error('Error in proxy for syfosmregister', err);
                    res.send({ err })
                });
        });
    }

    const port = process.env.PORT || 8191;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => {
    console.log(errorMessage, details);
};

renderApp()
    .then(startServer, (error) => {
        logError('Failed to render app', error);
    });
