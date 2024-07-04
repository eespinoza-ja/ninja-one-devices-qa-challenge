const { Selector, t } = require("testcafe");
const config = require("../../utils/config");

// Selectors
const addButton = Selector(".submitButton");
const deviceSpan = Selector("span.device-name");

// Actions
/**
 * validateDeviceDeleted function Verifies device is no longer visible and it doesn’t exist in the DOM
 * @param {Object} device - Device to validate
 */
export async function validateDeviceDeleted(device) {
	const deviceName = deviceSpan.withText(device.system_name);
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

	// Validate the device name does not exists
	await t
		.expect(deviceName.exists)
		.notOk(`Device with name: "${device.system_name}" is still visible`, {
			timeout: parseInt(config.waitTime),
		});

	// Validate the device type does not exists
	if (!(await deviceName.visible)) {
		await t
			.expect(deviceType.exists)
			.notOk(`Device with name: "${device.type}" is still visible`, {
				timeout: parseInt(config.waitTime),
			});
	}

	// Validate the device hdd capacity does not exists
	if (!(await deviceName.exists)) {
		await t
			.expect(deviceCapacity.exists)
			.notOk(`Device with name: "${device.hdd_capacity}" is still visible`, {
				timeout: parseInt(config.waitTime),
			});
	}
}
