import axios from "axios";
import { t } from "testcafe";
const config = require("../../utils/config");

/**
 * deleteDevice function Makes an API call that deletes a device
 * @param {String} id - device id to be deleted
 */
export const deleteDevice = async (id) => {
	const endpoint = `${config.baseApiUrl}/devices/${id}`;
	try {
		const response = await axios.delete(endpoint);
		if (response.status === 200) {
			console.log(`Deleted device with ID: ${id}`);
		} else {
			throw new Error(`Request failed with status ${response.status}`);
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}
