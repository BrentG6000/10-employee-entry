//const Employee = require("../lib/employee");
const Intern = require("../lib/intern");

describe("Intern", () => {
    describe("Initialization", () => {
        it("should create an object with a name, id, email, and school name if provided valid arguments", () => {
            const intern = new Intern("Sarah", 0001, "sarah@acme.com", "University of Minnesota");

            // Verify that the new object has the correct properties
            expect(intern.getSchool()).toEqual("University of Minnesota");
            expect(intern.getRole()).toEqual("Intern");
        });

        it("should throw an error if provided no school name", () => {
            // Wrap the object initialization in a callback function that Jest will run
            const cb = () => new Intern("Sarah", 0001, "sarah@acme.com");
            const err = new Error("Expected parameter 'school' to be a non-empty string");

            expect(cb).toThrowError(err);
        });

        it("should throw an error if school name is not a string", () => {
            // Wrap the object initialization in a callback function that Jest will run
            const cb = () => new Intern("Sarah", 0001, "sarah@acme.com", University of Minnesota);
        const err = new Error("Expected parameter 'school' to be a non-empty string");

        expect(cb).toThrowError(err);
        });
     })
});