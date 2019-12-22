var config = {};

config = require('./environments/' + process.env.NODE_ENV + '.js');

config.server = {};
config.server.env = process.env.NODE_ENV;
config.server.port = process.env.NODE_PORT || 5000;

config.jwt = {};
config.jwt.secret = "7854jgkfdg854jgkfdjg895483jgkfdjgwqaseaads";
config.jwt.options = {};
//config.jwt.options.expiresIn = 60 * 60 ;

config.encryption = {};
config.encryption.secret = "dhasj748rewuir_ruweoi877359345";
config.encryption.algorithm = 'aes-256-ctr';

config.constants = {};
config.env = {};
config.constants.apiPath = 'api';
config.constants.apiVersion = 'v1';
config.constants.appName = "WebVapors";
config.constants.appVersion = "v1";

config.session = {};
config.session.secret = "ashdjh48732jhjdfjksdhkfs";


module.exports = config;
