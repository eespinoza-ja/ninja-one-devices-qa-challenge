import devicesPage from "./devices.page";
const config = require("../../utils/config");

/**
 * validateDevices function Use the list of devices to check the elements are visible in the DOM
 * @param {Object} devices - List of devices
 */
export const validateDevices = async (t, devices) => {
	await t.wait(parseInt(config.waitTime));
	for (const device of devices) {
		await devicesPage.validateDeviceData(
			t,
			device.system_name,
			device.type,
			device.hdd_capacity,
		);
	}
};
