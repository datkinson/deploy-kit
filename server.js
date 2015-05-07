const config = require('config');

var configuration = config.get('Server');

if (configuration.has('dbConfig')) {
    if (configuration.dbConfig.type == 'pouchdb') {
        const PouchDB = require('pouchdb');
        var pouch = new PouchDB(configuration.dbConfig.location);
        pouch.info().then(console.log.bind(console));
    }
}

