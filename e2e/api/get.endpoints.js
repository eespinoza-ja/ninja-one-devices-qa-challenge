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
		if (response.status === 200) {
			await t.expect(response.data.length).gt(0, "The list must not be empty");
			return response.data;
		} else {
			throw new Error(`Request failed with status ${response.status}`);
		}
	} catch (error) {
		console.error(error);
		await t.expect(false).ok(`Error fetching data: ${error.message}`);
		throw error;
	}
};
