const os = require('os');
const config = require('config');
const PouchDB = require('pouchdb');
var db;
var environment;

const configuration = config.get('Server');

function initialiseDatabase() {
  if (configuration.has('dbConfig')) {
      if (configuration.dbConfig.type == 'pouchdb') {
          db = new PouchDB(configuration.dbConfig.location);
          db.info().then(console.log.bind(console));
      }
  }
    
    db.get('environment', function(err, doc) {
      if (err) {
          var data = {
              'host': os.hostname(),
              'arch': os.arch(),
              'type': os.type(),
              'platform': os.platform(),
              'release': os.release()
          }
          db.put(data, 'environment', function(err, response) {
            if (err) {
                console.log('put environment error');
                return console.log(err);
            }
            return;
          });
          return;
      }
      console.log(doc);
      return doc;
    });
}

initialiseDatabase();