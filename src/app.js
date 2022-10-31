const express = require('express');
const bodyParser = require('body-parser')

const helmet = require('helmet');
const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
// const compression = require('compression');
const cors = require('cors');
// const passport = require('passport');
// const httpStatus = require('http-status');
// const config = require('./config/config');
// const morgan = require('./config/morgan');
// const { jwtStrategy } = require('./config/passport');
// const { authLimiter } = require('./middlewares/rateLimiter');
// const routes = require('./routes/v1');
// const { errorConverter, errorHandler } = require('./middlewares/error');
// const ApiError = require('./utils/ApiError');

const app = express();

// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

// set security HTTP headers
app.use(helmet());

// parse json request body
// app.use(express.json());
// parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());

// gzip compression
// app.use(compression());

// enable cors
app.use(cors());
app.options('http://localhost:3001', cors());
// const corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);
//
// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }
//
// v1 api routes
// app.use('/v1', routes);
//
// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });
//
// convert error to ApiError, if needed
// app.use(errorConverter);
//
// handle error
// app.use(errorHandler);

// database
const db = require("./models");
const Role = db.role;

const initApp = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
initApp()

// todo uncomment in first run
// db.sequelize.sync({alter: true});
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to application."});
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/item.routes')(app);
require('./routes/tag.routes')(app);

// Build YOUrself
require('./routes/_routes/habit.routes')(app);
require('./routes/_routes/goal.routes')(app);
require('./routes/_routes/phrase.routes')(app);
require('./routes/_routes/progress.routes')(app);
require('./routes/_routes/reward.routes')(app);
// Build YOUrself


function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
console.log(123123)
module.exports = app;
