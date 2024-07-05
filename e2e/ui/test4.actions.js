import DevicesPage from "./devices.page";
import { deleteDevice } from "../api/delete.endpoints";

/**
 * validateDeviceDeleted function Verifies device is no longer visible and it doesn’t exist in the DOM
 * @param {Object} device - Device to validate
 */
export async function validateDeviceDeleted(t, device) {
	await deleteDevice(device.id);
	const devicesPage = new DevicesPage(
		device.system_name,
		device.type,
		device.hdd_capacity,
	);
	await devicesPage.validateDeviceRemoved();
}
