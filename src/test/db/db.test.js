
const testModel = require("../../data/test/simpleModel");
const db = require("../../config/db");

describe("test sequelize model", () => {
  
    // Before any tests run, clear the DB and run migrations with Sequelize sync()
    beforeAll(async () => {
      await testModel.sync({ force: true })
    })
  
    it("should succeed when creating simpleTest", async ()=> {
        const test = await testModel.create({
            someText: 'testos'
          });
        const expectedTest = await testModel.findByPk(1); 
          expect(expectedTest.someText).toBe(
            test.someText
          );
    })
  
    // After all tersts have finished, close the DB connection
    afterAll(async () => {
      await db.sequelize.close()
    })
  })