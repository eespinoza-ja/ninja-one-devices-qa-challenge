const { Selector, t } = require("testcafe");
const config = require("../../utils/config");

class DevicesPage {
	/**
	 *
	 * @param {String} name - Device name
	 * @param {String} type - Device type
	 * @param {String} capacity - Device hdd capacity
	 */
	constructor(name, type, capacity) {
		this.name = name;
		this.type = type;
		this.capacity = capacity;
		// Selectors
		this.deviceName = Selector("span.device-name").withText(name);
		this.addButton = Selector(".submitButton");
		this.deviceType = this.deviceName.sibling("span.device-type").withText(type);
		this.deviceCapacity = this.deviceName
			.sibling("span.device-capacity")
			.withText(capacity);
		this.deviceOptions = this.deviceName
			.parent("div.device-info")
			.sibling("div.device-options");
		this.deviceEditButton = this.deviceOptions.find("a.device-edit");
		this.deviceRemoveButton = this.deviceOptions.find("button.device-remove");
	}

	// Actions
	/**
	 * validate Page Reloads Correctly function To check the page is correclty reloaded
	 */
	async validatePageReloadsCorrectly() {
		await t
			.navigateTo(config.baseUrl)
			.expect(this.addButton.visible)
			.ok("Page does not load correclty", { timeout: parseInt(config.waitTime) });
	}

	/**
	 * Validate Device Data function To check device data is visible in the DOM elements
	 */
	async validateDeviceData() {
		// Validate the device has the corresponding name
		await t
			.expect(this.deviceName.exists)
			.ok(`No device was found with name: "${this.name}"`);

		// Validate the device has the corresponding type
		if (await this.deviceName.exists) {
			await t
				.expect(this.deviceType.exists)
				.ok(`No device was found with type: "${this.type}"`);
		}

		// Validate the device has the corresponding hdd capacity
		if (await this.deviceName.exists) {
			await t
				.expect(this.deviceCapacity.exists)
				.ok(`No device was found with capacity: "${this.capacity}"`);
		}

		// Validate the device contains an Edit button
		if (await this.deviceName.exists) {
			await t
				.expect(this.deviceEditButton.exists)
				.ok(`The device does not contains an Edit button`);
		}

		// Validate the device contains a Remove button
		if (await this.deviceName.exists) {
			await t
				.expect(this.deviceRemoveButton.exists)
				.ok(`The device does not contains a Remove button`);
		}
	}

	/**
	 * Validate Deleted Device function To check device data is not visible in the DOM elements
	 */
	async validateDeviceRemoved() {
		this.validatePageReloadsCorrectly();
		// Validate the device name does not exists
		await t
			.expect(this.deviceName.exists)
			.notOk(`Device with name: "${this.name}" is still visible`, {
				timeout: parseInt(config.waitTime),
			});

		// Validate the device type does not exists
		if (!(await this.deviceName.visible)) {
			await t
				.expect(this.deviceType.exists)
				.notOk(`Device with name: "${this.type}" is still visible`, {
					timeout: parseInt(config.waitTime),
				});
		}

		// Validate the device hdd capacity does not exists
		if (!(await this.deviceName.exists)) {
			await t
				.expect(this.deviceCapacity.exists)
				.notOk(`Device with name: "${this.capacity}" is still visible`, {
					timeout: parseInt(config.waitTime),
				});
		}
	}
}

export default DevicesPage;
