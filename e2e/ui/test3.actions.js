const { Selector, t } = require("testcafe");
const config = require("../../utils/config");

// Selectors
const addButton = Selector(".submitButton");
const deviceSpan = Selector("span.device-name");
const deviceNewName = "Renamed Device";

// Actions
/**
 * validateDeviceRenamed function Verifies the modified device has the new name
 * @param {Object} device - Device to validate
 */
export async function validateDeviceRenamed(device) {
	const deviceName = deviceSpan.withText(deviceNewName);
	const deviceType = deviceName
		.sibling("span.device-type")
		.withText(device.type);
	const deviceCapacity = deviceName
		.sibling("span.device-capacity")
		.withText(device.hdd_capacity);

	// Validate the page reloads correctly
	await t
		.navigateTo(config.baseUrl)
		.expect(addButton.visible)
		.ok("Page does not load correclty", { timeout: parseInt(config.waitTime) });

	// Validate the device name has been updated
	await t
		.expect(deviceName.exists)
		.ok(`No device was found with name: "${device.system_name}"`);

	// Validate the device has the correct type
	if (await deviceName.exists) {
		await t
			.expect(deviceType.exists)
			.ok(`No device was found with type: "${device.type}"`);
	}

	// Validate the device has the correct hdd capacity
	if (await deviceName.exists) {
		await t
			.expect(deviceCapacity.exists)
			.ok(`No device was found with capacity: "${device.hdd_capacity}"`);
	}
}
