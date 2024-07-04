const { Selector, t } = require("testcafe");
const config = require("../../utils/config");

// Selectors
const deviceSpan = Selector("span.device-name");
const editButton = "a.device-edit";
const removeButton = "button.device-remove";

// Actions
/**
 * validateDevices function Use the list of devices to check the elements are visible in the DOM
 * @param {Object} devices - List of devices
 */
export async function validateDevices(devices) {
	await t.wait(parseInt(config.waitTime));
	for (const device of devices) {
		const deviceName = deviceSpan.withText(device.system_name);
		const deviceType = deviceName
			.sibling("span.device-type")
			.withText(device.type);
		const deviceCapacity = deviceName
			.sibling("span.device-capacity")
			.withText(device.hdd_capacity);
		const deviceOptions = deviceName
			.parent("div.device-info")
			.sibling("div.device-options");
		const deviceEditButton = deviceOptions.find(editButton);
		const deviceRemoveButton = deviceOptions.find(removeButton);

		// Validate the device has the corresponding name
		await t
			.expect(deviceName.exists)
			.ok(`No device was found with name: "${device.system_name}"`);

		// Validate the device has the corresponding type
		if (await deviceName.exists) {
			await t
				.expect(deviceType.exists)
				.ok(`No device was found with type: "${device.type}"`);
		}

		// Validate the device has the corresponding hdd capacity
		if (await deviceName.exists) {
			await t
				.expect(deviceCapacity.exists)
				.ok(`No device was found with capacity: "${device.hdd_capacity}"`);
		}

		// Validate the device contains an Edit button
		if (await deviceName.exists) {
			await t
				.expect(deviceEditButton.exists)
				.ok(`The device does not contains an Edit button`);
		}

		// Validate the device contains a Remove button
		if (await deviceName.exists) {
			await t
				.expect(deviceRemoveButton.exists)
				.ok(`The device does not contains a Remove button`);
		}
	}
}
