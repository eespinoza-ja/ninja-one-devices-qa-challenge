import DevicesPage from "./devices.page";
import { updateDevice } from "../api/put.endpoints";

/**
 * validateDeviceRenamed function Verifies the modified device has the new name
 * @param {Object} device - Device to validate
 * @param {String} deviceNewName - Name to validate
 */
export async function validateDeviceRenamed(t, device, deviceNewName) {
	await updateDevice(device.id, {
		system_name: deviceNewName,
		type: device.type,
		hdd_capacity: device.hdd_capacity,
	});
	// Validate the page reloads correctly
	await devicesPage.validatePageReloadsCorrectly();
	// Validate the name is updated
	const devicesPage = new DevicesPage(
		deviceNewName,
		device.type,
		device.hdd_capacity,
	);
	await devicesPage.validateDeviceData();
}
