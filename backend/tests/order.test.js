const app = require('../server');
const supertest = require("supertest");
beforeEach(() => {
  jest.clearAllMocks();
});
test("List all the orders", async () => {
  await supertest(app).get("/api/order/")
    .expect(200)
    .then((response) => {
    });
});
test("Should not get order details for invalid orderID", async () => {
  await supertest(app).get("/api/order/:orderID")
    .expect(500)
    .then((response) => {
    });
});