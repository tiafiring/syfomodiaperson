var fs = require("fs");
var Mustache = require("mustache");

front = process.argv[2];
env = process.argv[3];

var timestamp = Date.now().toString();

var dev = {
    timestamp: timestamp,
    buildRoot: 'http://localhost:3040/assets',
    restRoot: 'http://localhost:8084/modiasyforest/rest',
    moteAdminRestRoot: 'http://localhost:8196/mote/rest',
    oppfoelgingsdialogRestRoot: 'http://localhost:8583/oppfoelgingsdialog-rest/api',
    veilederoppgaverRestRoot: 'http://localhost:8999/syfoveilederoppgaver/api',
    bundleFileName: 'bundle.js',
    decoratorRoot: 'http://localhost:8186',
    contextholderRoot: 'http://localhost:8090/eventdistributer',
    enableLogging: true,
};

var prod = {
    timestamp: timestamp,
    buildRoot: '/sykefravaer/js',
    restRoot: '/modiasyforest/rest',
    moteAdminRestRoot: '/mote/rest',
    oppfoelgingsdialogRestRoot: '/oppfoelgingsdialog-rest/api',
    veilederoppgaverRestRoot: '/syfoveilederoppgaver/api',
    bundleFileName: 'bundle-prod.js',
    decoratorRoot: '',
    contextholderRoot: '/eventdistributer',
    enableLogging: false,
};

fs.readFile(front, function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
