require("dotenv").config();

const config = {
	port: process.env.PORT,
	baseUrl: process.env.BASE_URL,
	baseApiUrl: process.env.BASE_API_URL,
	waitTime: process.env.WAIT_TIME,
};
module.exports = config;
