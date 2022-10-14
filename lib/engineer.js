const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, githubName) {
        if (typeof githubName !== "string" || !githubName.trim().length) {
            throw new Error("Expected parameter 'gitHubName' to be a non-empty string");
        }

        super(name, id, email);
        this.githubName = githubName;
    }

    getGithub() {
        return this.githubName;
    }

    getRole() {
        return 'Engineer';
    }
}
module.exports = Engineer;