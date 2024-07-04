import axios from "axios";
import { t } from "testcafe";
const config = require("../../utils/config");

/**
 * getDevices function Makes an API call to retrieve the list of devices
 * @returns {Object} devices - list of devices
 */
export async function getDevices() {
	const devices = await axios.get(`${config.baseApiUrl}/devices`);
	await t
		.expect(devices.status)
		.eql(200, `The status of the response is not 200: ${devices.status}`);
	return devices;
}
