import axios from "axios";
const config = require("../../utils/config");

/**
 * updateDevice function Makes an API call that updates a device
 * @param {String} id - device id to be updated
 * @param {Object} data - new device data
 */
export const updateDevice = async (id, data) => {
	const endpoint = `${config.baseApiUrl}/devices/${id}`;
	try {
		const response = await axios.put(endpoint, data);
		if (response.status === 200) {
			console.log(`Updated device with ID: ${id}`);
		} else {
			throw new Error(`Request failed with status ${response.status}`);
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
