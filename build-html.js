var fs = require("fs");
var Mustache = require("mustache");

var env = process.argv[2];
var timestamp = process.argv[3] || Date.now().toString();

var dev = {
    timestamp,
    buildRoot: 'http://localhost:3040/assets',
    restRoot: 'http://localhost:8084/modiasyforest/api',
    teksterRestRoot: 'http://localhost:8803/syfotekster/api',
    tilgangskontrollRestRoot: 'http://localhost:8586/syfo-tilgangskontroll/api',
    moteAdminRestRoot: 'http://localhost:8801/syfomoteadmin/api',
    oppfoelgingsdialogRestRoot: 'http://localhost:8583/syfooppfolgingsplanservice/api',
    fastlegerestRoot: 'http://localhost:8585/fastlegerest/api',
    bundleFileName: 'bundle.js',
    decoratorRoot: 'http://localhost:8186',
    contextholderRoot: 'http://localhost:8090/eventdistributer',
    syfomotebehovRoot: 'http://localhost:8811/syfomotebehov/api',
    enableLogging: true,
    isProd: false,
};

var prod = {
    timestamp,
    buildRoot: '/sykefravaer/js',
    restRoot: '/modiasyforest/api',
    teksterRestRoot: '/syfotekster/api',
    tilgangskontrollRestRoot: '/syfo-tilgangskontroll/api',
    moteAdminRestRoot: '/syfomoteadmin/api',
    oppfoelgingsdialogRestRoot: '/syfooppfolgingsplanservice/api',
    fastlegerestRoot: '/fastlegerest/api',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    contextholderRoot: '/eventdistributer',
    syfomotebehovRoot: '/syfomotebehov/api',
    syfosoknadRoot: `/syfosoknad/api`,
    enableLogging: false,
    isProd: true,
};

fs.readFile('html/syfomodiaperson.mustache', function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
