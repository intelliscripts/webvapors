var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var templateEngine = require('ejs');
var session = require('express-session');

var config = require(path.join(__dirname, "application", "config", "config"));

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views', path.join(__dirname, 'application', 'templates'));
app.engine('html', templateEngine.renderFile);
app.set('view engine', 'html');


app.use('/components/calendar', express.static(path.join(__dirname, 'application', 'public', 'components', 'calendar')));

app.use('/calendar', function (req, res, next)
{
    res.render('calendar/js-demo');
});

/*session should be instantiated after static routes*/
app.use(cookieParser(config.session.secret));
app.use(session(
    {
        secret: config.session.secret,
        resave: true,
        saveUninitialized: true
    }
));
/*end of sessions middleware*/


var expressServer = app.listen(config.server.port, function ()
{
    console.log("server is up and running on port " + config.server.port + " in " + config.server.env + " mode");
});