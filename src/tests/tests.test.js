import { fixture, t } from "testcafe";
const config = require("../utils/config");
import { getDevices } from "../e2e/api/get.endpoints";
import { validateDevices } from "../e2e/ui/test1.actions";
import { validateDeviceRenamed } from "../e2e/ui/test3.actions";
import { validateDeviceDeleted } from "../e2e/ui/test4.actions";

let devices;

fixture("Test Automation Tech Showcase")
	.page(config.baseUrl)
	.beforeEach(async () => {
		devices = await getDevices();
	});

test("Test 1", async (t) => {
	await validateDevices(t, devices);
});

test("Test 3", async (t) => {
	await validateDeviceRenamed(t, devices[0], "Renamed Device");
});

test("Test 4", async (t) => {
	await validateDeviceDeleted(t, devices[devices.length - 1]);
});
