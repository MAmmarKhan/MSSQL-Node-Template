var cors = require("cors");
var bodyParser = require('body-parser');
var app = require("./app.js");

require("dotenv").config();
var PORT = process.env.PORT || 3007;

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({
        error: 'Invalid JSON format. Please check the data sent.',
        completed: false
      });
    }
    next(err);
});

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

const ServerShutdown = () => {
    console.log("shutting down...");

    server.close(() => {
        console.log("Closed out remaining connections.");
        process.exit(0);
    });

    setTimeout(() => {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
    }, 10000);
};

process.on('SIGINT', ServerShutdown);
process.on('SIGTERM', ServerShutdown);

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err);
    ServerShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
    ServerShutdown();
});