import axios from "axios";
import { t } from "testcafe";
const config = require("../../utils/config");

/**
 * getDevices function Makes an API call to retrieve the list of devices
 * @returns {Object} response - list of devices
 */
export const getDevices = async () => {
	const endpoint = `${config.baseApiUrl}/devices`;
	try {
		const response = await axios.get(endpoint);
		await t.expect(response.status).eql(200, "Status code should be 200");
		await t
			.expect(response.data.length)
			.gt(0, "Devices list should not be empty");
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
