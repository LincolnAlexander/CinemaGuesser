const fetchData = require("./ref")

test('fetchData() resolves to \'accepted\'', async () => {
    await expect(fetchData()).resolves.toBe('accepted');
})