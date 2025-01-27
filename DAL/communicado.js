const { Connection, TYPES } = require("tedious");
const { dbConfig, configureRequest, createRequest } = require("../config/db");
const { generateToken } = require("../utilities/jwt");

require("dotenv").config();

const { CLIENT_URL, ADMIN_URL, TOKEN_EXPIRY } = process.env;

//////////
// Support
//////////

exports.createDummy = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return reject(new Error("Invalid parameters"));
            }

            if (!isEmailValid(email)) {
                return reject(new Error("Invalid email"));
            }

            resolve({
                Message:"Support ticket created successfully",
                Completed: true,
            });
        } catch (err) {
            console.error("Error during createSupportTicket:", err);
            return reject(new Error("Internal server error"));
        }
    });
};