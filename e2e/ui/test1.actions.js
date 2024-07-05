import DevicesPage from "./devices.page";
const config = require("../../utils/config");

/**
 * validateDevices function Use the list of devices to check the elements are visible in the DOM
 * @param {Object} devices - List of devices
 */
export async function validateDevices(t, devices) {
	await t.wait(parseInt(config.waitTime));
	for (const device of devices) {
		const devicesPage = new DevicesPage(
			device.system_name,
			device.type,
			device.hdd_capacity,
		);
		await devicesPage.validateDeviceData();
	}
}
