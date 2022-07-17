const admin = require("../admin");

// @ponicode
describe("admin.DeleteQuery", () => {
  test("0", async () => {
    await admin.DeleteQuery(
      { params: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } },
      { status: () => 400 }
    );
  });
});
