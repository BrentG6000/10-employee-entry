const Employee = require("../lib/employee");

describe("Employee", () => {
    describe("Initialization", () => {
        it("should create an object with a name, id, and email if provided valid arguments", () => {
            const employee = new Employee("Sarah", 1001, "sarah@acme.com");

            // Verify that the new object has the correct properties
            expect(employee.getName()).toEqual("Sarah");
            expect(employee.getId()).toEqual(1001);
            expect(employee.getEmail()).toEqual("sarah@acme.com");
            expect(employee.getRole()).toEqual("Employee");
        });

        it("should throw an error if provided no arguments", () => {
            // Wrap the object initialization in a callback function that Jest will run
            const cb = () => new Employee();

            // Verify that an error was thrown in the callback function
            expect(cb).toThrow();
        });

        it("should throw an error if not provided an id", () => {
            const cb = () => new Employee("Sarah", "sarah@acme.com");

            // Define the error message that is expected to be thrown
            const err = new Error("Expected parameter 'id' to be a number");

            // Verify that the correct error was thrown when the callback is executed
            expect(cb).toThrowError(err);
        });

        it("should throw an error if not provided an email", () => {
            const cb = () => new Employee("Sarah", 1001);

            // Define the error message that is expected to be thrown
            const err = new Error("Expected parameter 'email' to be a non-empty string");

            // Verify that the correct error was thrown when the callback is executed
            expect(cb).toThrowError(err);
        });

        it("should throw an error if 'name' is not a string", () => {
            const cb = () => new Employee(3, 1001, "sarah@acme.com");
            const err = new Error("Expected parameter 'name' to be a non-empty string");

            expect(cb).toThrowError(err);
        });

        it("should throw an error if 'id' is not a number", () => {
            const cb = () => new Employee("Sarah", "1001", "sarah@acme.com");
            const err = new Error("Expected parameter 'id' to be a number");

            expect(cb).toThrowError(err);
        });
     })
 });