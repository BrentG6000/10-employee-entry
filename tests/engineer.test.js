//const Employee = require("../lib/employee");
const Engineer = require("../lib/engineer");

describe("Engineer", () => {
    describe("Initialization", () => {
        it("should create an object with a name, id, email, and github username if provided valid arguments", () => {
            const engineer = new Engineer("Sarah", 1001, "sarah@acme.com", "sarah6000");

            // Verify that the new object has the correct properties
            expect(engineer.getGithub()).toEqual("sarah6000");
            expect(engineer.getRole()).toEqual("Engineer");
        });

        it("should throw an error if provided no github name", () => {
            // Wrap the object initialization in a callback function that Jest will run
            const cb = () => new Engineer("Sarah", 1001, "sarah@acme.com");
            const err = new Error("Expected parameter 'gitHubName' to be a non-empty string");

            expect(cb).toThrowError(err);
        });
     })
});