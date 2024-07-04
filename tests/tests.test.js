import { fixture, t } from "testcafe";
const config = require("../utils/config");
import { getDevices } from "../e2e/api/get.endpoints";
import { updateDevice } from "../e2e/api/put.endpoints";
import { deleteDevice } from "../e2e/api/delete.endpoints";
import { validateDevices } from "../e2e/ui/test1.actions";
import { validateDeviceRenamed } from "../e2e/ui/test3.actions";
import { validateDeviceDeleted } from "../e2e/ui/test4.actions";

let devices;

fixture("Test Automation Tech Showcase")
	.page(config.baseUrl)
	.beforeEach(async () => {
		devices = await getDevices();
		await t.expect(devices.length).gt(0, "The list must not be empty");
	});

test("Test 1", async () => {
	await validateDevices(devices);
});

test("Test 3", async () => {
	await updateDevice(devices[0].id, {
		system_name: "Renamed Device",
		type: devices[0].type,
		hdd_capacity: devices[0].hdd_capacity,
	});
	await validateDeviceRenamed(devices[0]);
});

test("Test 4", async () => {
	await deleteDevice(devices[devices.length - 1].id);
	await validateDeviceDeleted(devices[devices.length - 1]);
});
