import devicesPage from "./devices.page";
import { updateDevice } from "../api/put.endpoints";
const { Selector } = require("testcafe");
const config = require("../../utils/config");

/**
 * validateDeviceRenamed function Verifies the modified device has the new name
 * @param {Object} device - Device to validate
 * @param {String} deviceNewName - Name to validate
 */
export async function validateDeviceRenamed(t, device, deviceNewName) {
	const addButton = Selector(".submitButton");
	await updateDevice(device.id, {
		system_name: deviceNewName,
		type: device.type,
		hdd_capacity: device.hdd_capacity,
	});
	// Validate the page reloads correctly
	await t
		.navigateTo(config.baseUrl)
		.expect(addButton.visible)
		.ok("Page does not load correclty", { timeout: parseInt(config.waitTime) });
	await devicesPage.validateDeviceData(
		t,
		deviceNewName,
		device.type,
		device.hdd_capacity,
	);
}
