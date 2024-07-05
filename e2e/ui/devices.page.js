const { Selector } = require("testcafe");
const config = require("../../utils/config");

class DevicesPage {
	constructor() {
		// Selectors
		this.deviceSpan = Selector("span.device-name");
		this.editButton = "a.device-edit";
		this.removeButton = "button.device-remove";
		this.addButton = Selector(".submitButton");
	}

	// Actions
	/**
	 * Validate Device Data function To check device data is visible in the DOM elements
	 * @param {String} name - Device name
	 * @param {String} type - Device type
	 * @param {String} capacity - Device hdd capacity
	 */
	async validateDeviceData(t, name, type, capacity) {
		const deviceName = this.deviceSpan.withText(name);
		const deviceType = deviceName.sibling("span.device-type").withText(type);
		const deviceCapacity = deviceName
			.sibling("span.device-capacity")
			.withText(capacity);
		const deviceOptions = deviceName
			.parent("div.device-info")
			.sibling("div.device-options");
		const deviceEditButton = deviceOptions.find(this.editButton);
		const deviceRemoveButton = deviceOptions.find(this.removeButton);

		// Validate the device has the corresponding name
		await t
			.expect(deviceName.exists)
			.ok(`No device was found with name: "${name}"`);

		// Validate the device has the corresponding type
		if (await deviceName.exists) {
			await t
				.expect(deviceType.exists)
				.ok(`No device was found with type: "${type}"`);
		}

		// Validate the device has the corresponding hdd capacity
		if (await deviceName.exists) {
			await t
				.expect(deviceCapacity.exists)
				.ok(`No device was found with capacity: "${capacity}"`);
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

	/**
	 * Validate Deleted Device function To check device data is not visible in the DOM elements
	 * @param {String} name - Device name
	 * @param {String} type - Device type
	 * @param {String} capacity - Device hdd capacity
	 */
	async validateDeviceRemoved(t, name, type, capacity) {
		const deviceName = this.deviceSpan.withText(name);
		const deviceType = deviceName.sibling("span.device-type").withText(type);
		const deviceCapacity = deviceName
			.sibling("span.device-capacity")
			.withText(capacity);

		// Validate the page reloads correctly
		await t
			.navigateTo(config.baseUrl)
			.expect(this.addButton.visible)
			.ok("Page does not load correclty", { timeout: parseInt(config.waitTime) });

		// Validate the device name does not exists
		await t
			.expect(deviceName.exists)
			.notOk(`Device with name: "${name}" is still visible`, {
				timeout: parseInt(config.waitTime),
			});

		// Validate the device type does not exists
		if (!(await deviceName.visible)) {
			await t
				.expect(deviceType.exists)
				.notOk(`Device with name: "${type}" is still visible`, {
					timeout: parseInt(config.waitTime),
				});
		}

		// Validate the device hdd capacity does not exists
		if (!(await deviceName.exists)) {
			await t
				.expect(deviceCapacity.exists)
				.notOk(`Device with name: "${capacity}" is still visible`, {
					timeout: parseInt(config.waitTime),
				});
		}
	}
}

export default new DevicesPage();
