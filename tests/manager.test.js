//const Employee = require("../lib/employee");
const Manager = require("../lib/manager");

describe("Manager", () => { 
    describe("Initialization", () => {
        it("should create an object with a name, id, email, and office number if provided valid arguments", () => {
            const manager = new Manager("Sarah", 0001, "sarah@acme.com", 301);

            // Verify that the new object has the correct properties
            expect(manager.officeNumber).toEqual(301);
            expect(manager.getRole()).toEqual("Manager");
        });

        it("should throw an error if provided no office number", () => {
            // Wrap the object initialization in a callback function that Jest will run
            const cb = () => new Manager("Sarah", 0001, "sarah@acme.com");
            const err = new Error("Expected parameter 'officeNumber' to be a number");

            expect(cb).toThrowError(err);
        });

        it("should throw an error if office number is not a number", () => {
            // Wrap the object initialization in a callback function that Jest will run
            const cb = () => new Manager("Sarah", 0001, "sarah@acme.com", "301");
            const err = new Error("Expected parameter 'officeNumber' to be a number");

            expect(cb).toThrowError(err);
        });
     })
});