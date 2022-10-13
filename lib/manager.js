const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        if (typeof officeNumber !== "number") {
            throw new Error("Expected parameter 'officeNumber' to be a number");
        }

        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }
}
module.exports = Manager;