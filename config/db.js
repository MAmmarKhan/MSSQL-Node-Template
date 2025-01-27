const { Request, Connection } = require('tedious');
require('dotenv').config();

const dbConfig = {
    server: process.env.DATABASE_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
    },
    options: {
        database: process.env.DATABASE,
        port: parseInt(process.env.DATABASE_PORT, 10),
        encrypt: true, // Set to false if not using SSL
        trustServerCertificate: true,
    },
};

const connectDB = () => {
    return new Promise((resolve, reject) => {
        const connection = new Connection(dbConfig);

        connection.on('connect', (err) => {
            if (err) {
                console.error('Database connection failed:', err.message);
                reject(err);
            } else {
                resolve(connection);
            }
        });

        connection.connect();
    });
};

function configureRequest(sql, conn, parameters = null) {
    var request = createRequest(sql, conn);

    if (parameters != null) {        
        parameters.forEach(param => {
            if (param.output) {
                request.addOutputParameter(param.name, param.type);
            } else {
                request.addParameter(param.name, param.type, param.data);
            }
        });
    }

    return request;
}

function createRequest(query, connection) {
    const request = new Request(query, (err, rowCount) => {
        if (err) {
            console.error("Request error:", err);
        }
        connection && connection.close();
    });

    return request;
}

module.exports = {
    dbConfig,
    connectDB,
    configureRequest,
    createRequest
};