const config = require("../utils/config");
import { getDevices } from "../e2e/api/get.endpoints";
import { validateDevices } from "../e2e/ui/test1.actions";

fixture("Test Automation Tech Showcase").page(config.baseUrl);

test("Test 1", async () => {
	const devices = await getDevices();
	await validateDevices(devices.data);
});
